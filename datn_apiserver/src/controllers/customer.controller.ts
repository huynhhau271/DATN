import httpStatus from "http-status";
import customerService from "../services/customer.service";
import AuthenticatedRequest from "../types/request";
import { Response } from "express";

export const getAllCustomerByInfor = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const { email, name, dob } = req.body;
    const result = await customerService.getCustomerByInfo(name, dob, email);
    return res.status(httpStatus.OK).send(result);
};
