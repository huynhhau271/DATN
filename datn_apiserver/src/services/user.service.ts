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
    async createStaff(user: User, payload: UserPayLoad) {
        const checkEmail = await userRepository.findOne({
            where: {
                email: payload.email,
            },
        });
        if (checkEmail) throw new BadRequestError("Email Đã Tồn Tại");
        const checkPhone = await userRepository.findOne({
            where: {
                phone: payload.phone,
            },
        });
        const role = await authorityRepository.findOne({
            where: {
                name: "STAFF",
            },
        });
        console.log({ role });

        if (checkPhone) throw new BadRequestError("Số Điện Thoại Đã Tồn Tại");
        const newUser = await userRepository.create({
            ...payload,
            password: "123456",
            activated: true,
            roleId: role.id,
            createdBy: user.userId,
        });
        return newUser;
    }

    async login(login: Login) {
        const user = await userRepository.findOne({
            where: {
                email: login.email,
            },
            nest: true,
        });

        if (!user) throw new NotFoundError("Email hoặc mật khẩu không đúng");
        const checkPassword = await compare(login.password, user["password"]);
        if (!checkPassword)
            throw new NotFoundError("Email hoặc mật khẩu không đúng");
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
        let staffs = tranformModel(rows);
        staffs = staffs.map((staff) => {
            return { ...staff, role: staff?.role.name };
        });
        return {
            staffs: staffs,
            limit: limit,
            page: page,
            totalPage: Math.ceil(count / limit),
        };
    }

    async activeAndBlockUser(userLogin: User, idUser: number, active: boolean) {
        const user = await userRepository.findOne({
            where: {
                id: idUser,
                activated: active,
            },
        });
        if (!user) throw new BadRequestError("User Không Tồn Tại");
        await userRepository.update(
            {
                activated: !active,
                updatedBy: userLogin.userId,
            },
            {
                where: {
                    id: idUser,
                    activated: active,
                },
            }
        );
    }
    async updateStaff(user: User, userUpdate: UserPayLoad) {
        const userForUpdate = await userRepository.findByPk(userUpdate.id);
        console.log({ ward: userUpdate.wardId });
        if (!userForUpdate)
            throw new BadRequestError("Nhân Viên Không Tồn Tại");
        else
            return await userRepository.update(
                {
                    updatedBy: user.userId,
                    fullName: userUpdate.fullName,
                    gender: userUpdate.gender,
                    wardId: userUpdate.wardId,
                    dob: userUpdate.dob,
                    email: userUpdate.email,
                    phone: userUpdate.phone,
                },
                {
                    where: {
                        id: userUpdate.id,
                    },
                }
            );
    }
}

export default new userService();
