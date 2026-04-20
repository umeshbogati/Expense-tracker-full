import { Request, Response, NextFunction } from "express";
import { errorResponse, successResponse } from "../utils/responseHelper";
import * as transactionServices from "../services/transactionServices";
import { AuthRequest } from "../middlewares/authenticate";
import httpCodes from "../constants/httpCodes";

export const create = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return errorResponse(res, { status: httpCodes.INTERNAL_SERVER_ERROR.statusCode, message: "" })
        }

        const data = {
            ...req.body,
            file: req.file
        }

        const response = await transactionServices.createTransaction(data, userId);

        return successResponse(res, { data: response })

    } catch (error) {
        next(error);
    }
}

export const getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await transactionServices.getAll();

        return successResponse(res, { data: response })
    }
    catch (error) {
        next(error);
    }
}