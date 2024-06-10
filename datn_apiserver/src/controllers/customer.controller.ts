import httpStatus from "http-status";
import customerService from "../services/customer.service";
import AuthenticatedRequest from "../types/request";
import { Response } from "express";

export const createCustomer = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const customer = req.body;
    const result = await customerService.create(customer);
    return res.status(httpStatus.OK).send(result);
};

export const getAllCustomerByInfor = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const { email, name, dob } = req.body;
    const result = await customerService.getCustomerByInfo(name, dob , email);
    return res.status(httpStatus.OK).send(result);
};

export const getCustomerByEmail = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const { email } = req.user;
    const result = await customerService.getCustomerByEmail(email);
    return res.status(httpStatus.OK).send(result);
};

export const trackingCustomer = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const { email, fullName, dob } = req.body;
    const result = await customerService.getTrackingCustomer({
        fullName,
        dob,
        email,
    });
    return res.status(httpStatus.OK).send(result);
};
