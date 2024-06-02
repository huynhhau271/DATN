import { Request, Response } from "express";
import AuthenticatedRequest from "../types/request";
import userService from "../services/user.service";
import httpStatus from "http-status";

export const login = async (req: Request, res: Response) => {
    const login = req.body;
    const result = await userService.login(login);
    return res.status(httpStatus.OK).send(result);
};

export const getAllStaff = async (req: AuthenticatedRequest, res: Response) => {
    const limit = req.query.limit ?? 10;
    const page = req.query.page ?? 1;
    const search = req.query.search as string;
    const result = await userService.getAllStaff(+limit, +page, search);
    return res.status(httpStatus.OK).send(result);
};

export const saveStaff = async (req: AuthenticatedRequest, res: Response) => {
    const newUser = req.body;
    const user = req.user;
    const result = await userService.saveStaff(user, newUser);
    return res.status(httpStatus.OK).send(result);
};
export const activeUser = async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    const userId = req.query.idStaff;
    const active = req.query.isActive as string;
    await userService.activeAndBlockUser(
        user,
        +userId,
        active === "true" ? true : false
    );
    return res.status(httpStatus.OK).send("OK");
};
export const getStaffs = async (req: AuthenticatedRequest, res: Response) => {
    const staffs = await userService.getStaff();
    return res.status(httpStatus.OK).send(staffs);
};
