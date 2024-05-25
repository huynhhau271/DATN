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
export const activeVaccine = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const vaccineId = req.query.idVaccine;
    const active = req.query.isActive as string;

    await vaccineService.activeAndBlockVaccine(
        +vaccineId,
        active === "true" ? true : false
    );
    return res.status(httpStatus.OK).send("OK");
};
export const getAllVaccineByMontOld = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const mothOld = req.query.mothOld;
    const response = await vaccineService.getAllVaccineByMontOld(+mothOld);
    res.status(httpStatus.OK).send(response);
};
