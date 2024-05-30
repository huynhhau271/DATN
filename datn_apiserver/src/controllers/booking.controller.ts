import httpStatus from "http-status";
import bookingService from "../services/booking.service";
import AuthenticatedRequest from "../types/request";
import { Response } from "express";

export const booking = async (req: AuthenticatedRequest, res: Response) => {
    const booking = req.body;
    const result = await bookingService.booking(booking);
    return res.status(httpStatus.OK).send(result);
};

export const confirmBooking = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const { email, name, dob, otp } = req.body;
    await bookingService.confirm(email, name, dob, otp);
    return res.status(httpStatus.OK).send();
};

export const getAllBooking = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const { limit, page } = req.query;
    const result = await bookingService.getAllBooking(+limit, +page);
    return res.status(httpStatus.OK).send(result);
};
