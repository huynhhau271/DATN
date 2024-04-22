import { Request, Response } from "express";
import AuthenticatedRequest from "../types/request";
import userService from "../services/user.service";
import httpStatus from "http-status";

export const createUser = async (req: AuthenticatedRequest, res: Response) => {
    const newUser = req.body;
    const user = req.user;
    const result = await userService.createUser(user, newUser);
    return res.status(httpStatus.OK).send(result);
};

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
