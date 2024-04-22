import userRepository from "../repositories/userRepository";
import { Request, Response } from "express";
import httpStatus from "http-status";
import authorityRepository from "../repositories/authorityRepository";
import { UserRoles } from "../types/userRoles";

export const seederUser = async (req: Request, res: Response) => {
    await authorityRepository.bulkCreate([
        {
            name: UserRoles.MANAGER,
            description: "Role Manager",
        },
        {
            name: UserRoles.DEPUTY,
            description: "Role Deputy",
        },
        {
            name: UserRoles.STAFF,
            description: "Role Staff",
        },
    ]);
    await userRepository.create({
        email: "manager@gmail.com",
        password: "manager",
        roleId: 1,
        fullName: "Hải Hậu",
        gender: true,
        activated: true,
    });

    res.status(httpStatus.OK).send("OKe");
};
