import { Response } from "express";
import AuthenticatedRequest from "../types/request";
import httpStatus from "http-status";
import healtSheetService from "../services/healtSheet.service";
export const physicalExamination = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const data = req.body;
    const nurseStaff = req.user;
    const result = await healtSheetService.physicalExamination({
        ...data,
        nurseStaffId: nurseStaff.userId,
    });
    res.status(httpStatus.OK).send(result);
};
