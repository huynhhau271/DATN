import { Op } from "sequelize";
import { BookingPayload } from "../interface/IBooking";
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
                .catch(() => {
                    t.rollback();
                    throw new BadRequestError("Đăng Ký Tiêm Chủng Thất Bại");
                });
        }
    }
    async confirm(email: string, name: string, dob: Date, otp: string) {
        console.log(new Date(dob).toISOString().slice(0, 19).replace("T", " "));
        console.log({ name, email });

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
}

export default new BookingService();
