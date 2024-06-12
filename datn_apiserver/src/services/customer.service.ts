import bookingRepository from "../repositories/bookingRepository";
import customerRepository from "../repositories/customerRepository";
import vaccineRepository from "../repositories/vaccineRepository";
import { BadRequestError, NotFoundError } from "../utils/httpErrors";
import wardRepository from "../repositories/wardRepository";
import userRepository from "../repositories/userRepository";
import { StatusBooking } from "../domain/enum/statusBooking";
import { ICustomer } from "../interface/ICustomer";
import { signToken } from "../utils/auth/jwt";
import { compare } from "bcryptjs";
import { Login } from "./user.service";
import { User } from "../utils/user";

class CustomerService {
    async create(customer: ICustomer) {
        const checkEmailExists = await customerRepository.findOne({
            where: {
                email: customer.email,
            },
        });
        if (checkEmailExists) {
            throw new BadRequestError("Email đã tồn tại");
        }
        const newCustomer = await customerRepository.create(customer);
        return newCustomer;
    }

    async loginCustomer(login: Login) {
        const customer = await customerRepository.findOne({
            where: {
                email: login.email,
            },
            nest: true,
        });

        if (!customer)
            throw new NotFoundError("Email hoặc mật khẩu không đúng");
        const checkPassword = await compare(
            login.password,
            customer["password"]
        );
        if (!checkPassword)
            throw new NotFoundError("Email hoặc mật khẩu không đúng");
        const token = signToken({
            userId: customer["id"],
            roleId: customer["roleId"],
            email: customer["email"],
            fullName: customer["fullName"],
        });
        return {
            token: token,
            user: customer,
        };
    }

    async getCustomerByEmail(email: string) {
        const customer = await customerRepository.findOne({
            where: {
                email: email,
            },
        });

        if (!customer)
            throw new BadRequestError("Thông Tin Khách Hàng Không Tồn Tại");
        else return customer;
    }

    async getCustomer(user: User) {
        const customer = await customerRepository.findOne({
            where: {
                id: user.userId,
                email: user.email,
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

    async getTrackingCustomer(user: User) {
        console.log({ user });

        const tracking = await customerRepository.findOne({
            include: [
                {
                    model: bookingRepository,
                    where: {
                        statused: StatusBooking.INJECTED,
                    },
                    include: [
                        {
                            model: vaccineRepository,
                            attributes: ["vaccineName"],
                        },
                        {
                            model: userRepository,
                            foreignKey: "nurseStaffId",
                            association: "nurseStaff",
                            as: "nurseStaff",
                        },
                    ],
                },
                wardRepository,
            ],
            where: {
                email: user.email,
                id: user.userId,
            },
        });

        return tracking || null;
    }
}
export default new CustomerService();
