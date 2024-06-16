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
import { UserRoles } from "../types/userRoles";
import wardRepository from "../repositories/wardRepository";
import districtsRepository from "../repositories/districtsRepository";
import provinceRepository from "../repositories/provinceRepository";
import { getAllStaff } from "../controllers/user.controller";
export interface Login {
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
    async saveStaff(user: User, payload: UserPayLoad) {
        const roleUser = await authorityRepository.findOne({
            where: {
                name: payload.roleName || UserRoles.STAFF,
            },
            raw: true,
        });
        if (payload.id) {
            const userForUpdate = await userRepository.findByPk(payload.id);
            if (!userForUpdate)
                throw new BadRequestError("Người Dùng Không Tồn Tại");
            else
                return await userRepository.update(
                    {
                        updatedBy: user.userId,
                        fullName: payload.fullName,
                        gender: payload.gender,
                        wardId: payload.wardId,
                        dob: payload.dob,
                        email: payload.email,
                        phone: payload.phone,
                        roleId: roleUser.id,
                        avatar: payload.avatar,
                    },
                    {
                        where: {
                            id: payload.id,
                        },
                    }
                );
        }
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

        if (checkPhone) throw new BadRequestError("Số Điện Thoại Đã Tồn Tại");
        const newUser = await userRepository.create({
            ...payload,
            password: "123456",
            activated: true,
            roleId: roleUser.id,
            createdBy: user.userId,
        });
        return newUser;
    }

    async register(user: IUser) {
        if (!user.email || !user.password) {
            throw new BadRequestError("Thiếu email hoặc password");
        }
        const checkEmail = await userRepository.findOne({
            where: {
                email: user.email,
            },
        });
        if (checkEmail) throw new BadRequestError("Email Đã Tồn Tại");

        const roleUser = await authorityRepository.findOne({
            where: {
                name: user.roleName || UserRoles.CUSTOMER,
            },
            raw: true,
        });

        const newUser = await userRepository.create({
            email: user.email,
            password: user.password,
            activated: true,
            roleId: roleUser.id,
        });
        return newUser;
    }

    async login(login: Login) {
        const user = await userRepository.findOne({
            where: {
                email: login.email,
            },
            include: [authorityRepository],
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
            user: { ...user.toJSON(), roleName: user.toJSON().role.name },
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
                {
                    model: wardRepository,
                    include: [
                        {
                            model: districtsRepository,
                            include: [
                                {
                                    model: provinceRepository,
                                },
                            ],
                        },
                    ],
                    attributes: ["id", "districtId"],
                },
            ],
        });
        let staffs = tranformModel(rows);
        staffs = staffs.map((staff) => {
            return {
                ...staff,
                roleName: staff?.role.name,
                districtId: staff["ward"]["districtId"],
                provinceId: staff["ward"]["district"]["provinceId"],
            };
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

    async getStaff() {
        const authori = await authorityRepository.findOne({
            where: {
                name: UserRoles.STAFF,
            },
        });

        const staffs = await userRepository.findAll({
            where: {
                roleId: authori.id,
            },
        });

        return staffs;
    }
}

export default new userService();
