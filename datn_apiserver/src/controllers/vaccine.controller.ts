import { Request, Response } from "express";
import AuthenticatedRequest from "../types/request";
import httpStatus from "http-status";
import vaccineService from "../services/vaccine.service";

export const getAllVaccine = async (req: Request, res: Response) => {
    const page = req.query.page ?? 1;
    const limit = req.query.limit ?? 10;
    const search = req.query.search as string;
    const result = await vaccineService.getAllVaccine(+limit, +page, search);
    return res.status(httpStatus.OK).send(result);
};
export const saveVaccine = async (req: AuthenticatedRequest, res: Response) => {
    const vaccine = req.body;
    const user = req.user;
    const result = await vaccineService.saveVaccine(user, vaccine);
    return res.status(httpStatus.OK).send(result);
};
