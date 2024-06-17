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

export const getCustomer = async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    const result = await customerService.getCustomer(user);
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
    const user = req.user;
    const result = await customerService.getTrackingCustomer(user);
    return res.status(httpStatus.OK).send(result);
};

export const getCustomerById = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const { id } = req.query;
    const result = await customerService.getCustomerById(+id);
    return res.status(httpStatus.OK).send(result);
};
export const updateCustomer = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const customer = req.body;
    const result = await customerService.updateCustomer(customer);
    return res.status(httpStatus.OK).send(result);
};
