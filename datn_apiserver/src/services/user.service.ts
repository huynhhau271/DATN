import "dotenv/config";
import userRepository from "../repositories/userRepository";
import { compare } from "bcryptjs";
import { BadRequestError, NotFoundError } from "../utils/httpErrors";
import { User } from "../utils/user";
import { signToken } from "../utils/auth/jwt";
import { UserPayLoad } from "../types/User";
import { Op } from "sequelize";
import { IUser } from "../interface/IUser";
import { tranformModel } from "./helper/tranformModelToObject";
import authorityRepository from "../repositories/authorityRepository";
interface Login {
    email: string;
    password: string;
}
interface Staff {
    staffs: IUser[];
    limit: number;
    page: number;
    totalPage: number;
}
class userService {
    async createUser(user: User, newUser: UserPayLoad) {
        const checkUser = await userRepository.findOne({
            where: {
                email: newUser.email,
            },
        });
        if (checkUser) throw new BadRequestError("Email already exists");
        const checkPhone = await userRepository.findOne({
            where: {
                phone: newUser.phone,
            },
        });
        if (checkPhone) throw new BadRequestError("Phone already exists");
        return await userRepository.create({
            ...newUser,
            activated: false,
            createdBy: user.userId,
            roleId: user.roleId,
        });
    }

    async login(login: Login) {
        const user = await userRepository.findOne({
            where: {
                email: login.email,
            },
            nest: true,
        });

        if (!user) throw new NotFoundError("Username or password is incorrect");
        const checkPassword = await compare(login.password, user["password"]);
        if (!checkPassword)
            throw new NotFoundError("Username or password is incorrect");
        const token = signToken({
            userId: user["id"],
            roleId: user["roleId"],
            email: user["email"],
            fullName: user["fullName"],
        });
        return {
            token: token,
            user: user,
        };
    }

    async getAllStaff(
        limit: number,
        page: number,
        search?: string
    ): Promise<Staff> {
        const query = {};
        if (search)
            query["where"] = {
                [Op.or]: [
                    {
                        fullName: {
                            [Op.like]: `%${search}%`,
                        },
                    },
                    {
                        email: {
                            [Op.like]: `%${search}%`,
                        },
                    },
                ],
            };
        query["limit"] = limit;
        query["offset"] = (page - 1) * limit;
        const { rows, count } = await userRepository.findAndCountAll({
            ...query,
            include: [
                {
                    model: authorityRepository,
                    attributes: ["name"],
                },
            ],
        });
        const staffs = tranformModel(rows);
        return {
            staffs: staffs,
            limit: limit,
            page: page,
            totalPage: Math.ceil(count / limit),
        };
    }
}
export default new userService();
