import bookingRepository from "../repositories/bookingRepository";
import customerRepository from "../repositories/customerRepository";
import vaccineRepository from "../repositories/vaccineRepository";
import { BadRequestError } from "../utils/httpErrors";
import exportDetail from "../domain/exportDetail.entity";
import wardRepository from "../repositories/wardRepository";

class CustomerService {
    async getCustomerByInfo(name: string, dob: string, email: string) {
        const customer = await customerRepository.findOne({
            where: {
                customerName: name,
                customerDoB: new Date(dob)
                    .toISOString()
                    .slice(0, 19)
                    .replace("T", " "),
                email: email,
            },
            include: [
                {
                    model: bookingRepository,
                    include: [
                        {
                            model: vaccineRepository,
                        },
                    ],
                },
            ],
        });

        if (!customer)
            throw new BadRequestError("Thông Tin Khách Hàng Không Tồn Tại");
        else return customer;
    }

    async getTrackingCustomer({ fullName, dob, email }) {
        const tracking = await customerRepository.findOne({
            include: [
                {
                    model: bookingRepository,
                    include: [
                        {
                            model: vaccineRepository,
                            attributes: ["vaccineName"],
                        },
                    ],
                },
                wardRepository,
            ],
            where: {
                email: email,
                customerDoB: dob,
                customerName: fullName,
            },
        });
        if (!tracking)
            throw new BadRequestError("Thông Tin Khách Hàng Không Tồn Tại");
        else return tracking;
    }
}
export default new CustomerService();
