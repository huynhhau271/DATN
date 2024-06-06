import { Op } from "sequelize";
import { BookingPayload, IBooking } from "../interface/IBooking";
import bookingRepository from "../repositories/bookingRepository";
import vaccineRepository from "../repositories/vaccineRepository";
import { BadRequestError } from "../utils/httpErrors";
import customerRepository from "../repositories/customerRepository";
import { database } from "../configs/database";
import mailService from "./mail.service";
import { mailConfirm } from "../utils/mailTemplate/mailConfirm";
import { genKeyConfirm } from "../utils/genKeyActive";
import { StatusBooking } from "../domain/enum/statusBooking";
import Customer from "../domain/customer.entity";
import moment from "moment";
import { tranformModel } from "./helper/tranformModelToObject";
import { mailNotification } from "../utils/mailTemplate/mailNotification";
import { User } from "../utils/user";
import userRepository from "../repositories/userRepository";
interface Bookings {
    bookings: IBooking[];
    limit: number;
    page: number;
    totalPage: number;
}
class BookingService {
    async booking(bookingPayload: BookingPayload[]) {
        const checkVaccine = await vaccineRepository.findOne({
            where: {
                quantity: { [Op.gte]: 0 },
                id: bookingPayload[0].vaccineId,
            },
        });
        const keyConfirm = genKeyConfirm();
        const t = await database.transaction();
        if (!checkVaccine)
            throw new BadRequestError("Vaccine Không Có Trong Hệ Thống");

        if (bookingPayload[0].customerId) {
            const checkCustomer = await customerRepository.findByPk(
                bookingPayload[0].customerId
            );
            if (!checkCustomer)
                throw new BadRequestError("Khách Hàng Không Có Trong Hệ Thống");
            const booking = bookingPayload.map((payload) => {
                return {
                    expectedDate: payload.expectedDate,
                    vaccineId: payload.vaccineId,
                    customerId: payload.customerId,
                    statused: StatusBooking.UNCONFIMRED,
                    paymentSatus: false,
                    confirmKey: keyConfirm,
                };
            });
            Promise.all([
                bookingRepository.bulkCreate(booking),
                mailService.sendmail(
                    checkCustomer.toJSON().email,
                    "[PHÒNG TIÊM CHỦNG VACXIN ĐẠI LỘC] - Xác nhận thông tin đăng ký tiêm chủng của Quý khách hàng.",
                    mailConfirm(
                        checkCustomer.toJSON().customerName,
                        checkCustomer.toJSON().phone,
                        moment(checkCustomer.toJSON().customerDoB).format(
                            "DD-MM-YYYY"
                        ),
                        checkVaccine.toJSON().vaccineName,
                        moment(bookingPayload[0].expectedDate).format(
                            "DD-MM-YYYY"
                        ),
                        keyConfirm
                    )
                ),
            ])
                .then(() => t.commit())
                .catch(() => {
                    t.rollback();
                    throw new BadRequestError("Đăng Ký Tiêm Thất Bại");
                });
        } else {
            const customer = await customerRepository.create({
                ...bookingPayload[0].customer,
                customerDoB: moment(
                    bookingPayload[0].customer.customerDoB
                ).toDate(),
            } as Customer);
            const booking = bookingPayload.map((payload) => {
                return {
                    expectedDate: moment(payload.expectedDate).toDate(),

                    statused: StatusBooking.UNCONFIMRED,

                    vaccineId: payload.vaccineId,

                    customerId: customer.id,

                    paymentSatus: false,
                    confirmKey: keyConfirm,
                };
            });

            Promise.all([
                bookingRepository.bulkCreate(booking, {
                    include: [
                        {
                            model: customerRepository,
                            as: "customer",
                        },
                    ],
                }),
                mailService.sendmail(
                    bookingPayload[0].customer.email,
                    "[PHÒNG TIÊM CHỦNG VACXIN ĐẠI LỘC] - Xác nhận thông tin đăng ký tiêm chủng của Quý khách hàng.",
                    mailConfirm(
                        customer.toJSON().customerName,
                        customer.toJSON().phone,
                        moment(customer.toJSON().customerDoB).format(
                            "DD-MM-YYYY"
                        ),
                        checkVaccine.toJSON().vaccineName,
                        moment(bookingPayload[0].expectedDate).format(
                            "DD-MM-YYYY"
                        ),
                        keyConfirm
                    )
                ),
            ])
                .then(() => t.commit())
                .catch((err) => {
                    t.rollback();
                    console.log(err);

                    throw new BadRequestError("Đăng Ký Tiêm Chủng Thất Bại");
                });
        }
    }
    async confirm(email: string, name: string, dob: Date, otp: string) {
        const customer = await customerRepository.findOne({
            where: {
                email: email,
                parentsName: name,
                customerDoB: new Date(dob)
                    .toISOString()
                    .slice(0, 19)
                    .replace("T", " "),
            },
        });

        if (!customer)
            throw new BadRequestError("Thông Tin Khách Hàng Không Đúng");
        const findBooking = await bookingRepository.findAll({
            where: {
                customerId: customer.toJSON().id,
                statused: StatusBooking.UNCONFIMRED,
                confirmKey: otp,
            },
            include: [customerRepository],
        });

        if (findBooking.length <= 0)
            throw new BadRequestError("OTP Không Chính Xác");
        await bookingRepository.update(
            {
                statused: StatusBooking.CONFIRMED,
            },
            {
                where: {
                    customerId: customer.toJSON().id,
                    statused: StatusBooking.UNCONFIMRED,
                    confirmKey: otp,
                },
            }
        );
    }
    async getAllBooking(
        limit: number,
        page: number,
        search?: string
    ): Promise<Bookings> {
        const { rows, count } = await bookingRepository.findAndCountAll({
            limit: limit,
            offset: (page - 1) * limit,
            include: [
                {
                    model: vaccineRepository,
                },
                {
                    model: customerRepository,
                },
            ],
        });

        let bookings = tranformModel(rows);
        return {
            bookings,
            limit: limit,
            page: page,
            totalPage: Math.ceil(count / limit),
        };
    }
    async notification() {
        const today = moment().add(3, "d").toDate();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        const day = String(today.getDate()).padStart(2, "0");
        const later = `${year}-${month}-${day}`;
        const t = await database.transaction();

        const boookings = await bookingRepository.findAll({
            where: {
                expectedDate: new Date(later)
                    .toISOString()
                    .slice(0, 19)
                    .replace("T", " "),
                statused: StatusBooking.CONFIRMED,
            },
            include: [customerRepository, vaccineRepository],
        });
        await bookingRepository.update(
            { statused: StatusBooking.NOTIFICATION_SENT },
            {
                where: {
                    expectedDate: new Date(later)
                        .toISOString()
                        .slice(0, 19)
                        .replace("T", " "),
                    statused: StatusBooking.CONFIRMED,
                },
            }
        );
        boookings.forEach((booking) => {
            const customer = booking.toJSON().customer;
            const vaccine = booking.toJSON().vaccine;
            mailService
                .sendmail(
                    customer.email,
                    "[PHÒNG TIÊM CHỦNG VACXIN ĐẠI LỘC] – Thông báo nhắc nhở lịch tiêm đến Quý khách hàng.",
                    mailNotification(
                        customer.customerName,
                        customer.phone,
                        moment(customer.customerDoB).format("DD-MM-YYYY"),
                        vaccine.vaccineName,
                        moment(booking.toJSON().expectedDate).format(
                            "DD-MM-YYYY"
                        )
                    )
                )
                .then(() => t.commit().then())
                .catch(() => t.rollback().then());
        });
    }
    async payment(user: User, bookingId: number) {
        const booking = await bookingRepository.findAll({
            where: {
                id: bookingId,
                statused: StatusBooking.BE_INJECTED,
            },
        });
        console.log({ booking });

        if (!booking) throw new BadRequestError("Đơn hàng không tồn tại");
        else
            await bookingRepository.update(
                {
                    paymentSatus: true,
                    userId: user.userId,
                },
                {
                    where: {
                        id: bookingId,
                        paymentSatus: false,
                        statused: StatusBooking.BE_INJECTED,
                    },
                }
            );
    }

    async inject(bookingId: number, nuffId: number) {
        const booking = await bookingRepository.findByPk(bookingId);
        if (!booking)
            throw new BadRequestError("Có Lỗi Hệ Thống Vui Lòng Thử Lại Sau");
        const nuff = await userRepository.findByPk(nuffId);
        if (!nuff) throw new BadRequestError("Nhân Viên Y Tế Không Tồn Tại");

        await bookingRepository.update(
            {
                nurseStaffId: nuffId,
                statused: StatusBooking.INJECTED,
            },
            {
                where: {
                    id: bookingId,
                },
            }
        );
    }
}

export default new BookingService();
