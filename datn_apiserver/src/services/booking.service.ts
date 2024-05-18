import { Op } from "sequelize";
import { IBooking } from "../interface/IBooking";
import bookingRepository from "../repositories/bookingRepository";
import vaccineRepository from "../repositories/vaccineRepository";
import { BadRequestError } from "../utils/httpErrors";
import customerRepository from "../repositories/customerRepository";
import { database } from "../configs/database";
import mailService from "./mail.service";
import { mailConfirm } from "../utils/mailTemplate/mailConfirm";
import { genKeyActive } from "../utils/genKeyActive";

class BookingService {
    async booking(bookingPayload: IBooking) {
        const checkVaccine = await vaccineRepository.findOne({
            where: {
                quantity: { [Op.gte]: 0 },
                id: bookingPayload.vaccineId,
            },
        });
        const t = await database.transaction();
        if (!checkVaccine)
            throw new BadRequestError("Vaccine Không Có Trong Hệ Thống");
        if (bookingPayload.customerId) {
            const checkCustomer = customerRepository.findByPk(
                bookingPayload.customerId
            );
            if (!checkCustomer)
                throw new BadRequestError("Khách Hàng Không Có Trong Hệ Thống");
            try {
                const booking = delete bookingPayload.customer;
                await bookingRepository.create(booking);
                mailService.sendmail(
                    bookingPayload.customer.email,
                    "Xác Nhận Tiêm Chủng",
                    mailConfirm(
                        bookingPayload.customer.parentsName,
                        genKeyActive()
                    )
                );
                t.commit();
            } catch (error) {
                t.rollback();
                throw new BadRequestError("Đăng Ký Tiêm Thất Bại");
            }
        } else {
            try {
                await bookingRepository.create(
                    {
                        ...bookingPayload,
                        customer: customerRepository
                            .build(bookingPayload.customer, { raw: true })
                            .toJSON(),
                    },
                    {
                        include: [customerRepository],
                    }
                );
                await t.commit();
            } catch (error) {
                t.rollback();
                throw new BadRequestError("Đăng Ký Tiêm Chủng Thất Bại");
            }
        }
    }
}
export default new BookingService();
