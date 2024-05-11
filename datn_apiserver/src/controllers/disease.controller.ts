import { Request, Response } from "express";
import AuthenticatedRequest from "../types/request";
import httpStatus from "http-status";
import diseaseService from "../services/disease.service";

export const getAllDisease = async (req: Request, res: Response) => {
    const page = req.query.page ?? 1;
    const limit = req.query.limit ?? 10;
    const search = req.query.search as string;
    const result = await diseaseService.getAllDisease(+limit, +page, search);
    return res.status(httpStatus.OK).send(result);
};
export const saveDisease = async (req: AuthenticatedRequest, res: Response) => {
    const disease = req.body;
    const result = await diseaseService.saveDisease(disease);
    return res.status(httpStatus.OK).send(result);
};
export const deleteDisease = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const id = req.query.diseaseId;
    const result = await diseaseService.deleteDisease(+id);
    return res.status(httpStatus.OK).send(result);
};
