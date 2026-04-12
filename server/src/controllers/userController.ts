import { Request, Response, NextFunction } from "express";
import * as userServices from "../services/userServices";
import { errorResponse, successResponse } from "../utils/responseHelper";
import { AuthRequest } from "../middlewares/authenticate";
import httpCodes from "../constants/httpCodes";

export const getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await userServices.getAll();

        return successResponse(res, { data: response })

    } catch (error) {
        next(error);
    }
}

export const getMe = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return errorResponse(res, { status: httpCodes.BAD_REQUEST.statusCode, message: "Missing userId in the request query" });
        }

        const response = await userServices.getById(userId);

        return successResponse(res, { data: response })

    } catch (error) {
        next(error);
    }
}

export const updateUserRoles = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId } = req.params;
        const { roleList } = req.body;

        if (!userId) {
            return errorResponse(res, { status: httpCodes.BAD_REQUEST.statusCode, message: "Missing userId in the request query" });
        }

        const response = await userServices.updateUserRoles(String(userId), roleList);

        return successResponse(res, { data: response })

    } catch (error) {
        next(error);
    }
}

export const getById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return errorResponse(res, { status: httpCodes.BAD_REQUEST.statusCode, message: "Missing userId in the request query" });
        }

        const response = await userServices.getById(String(userId));

        return successResponse(res, { data: response })
    }
    catch (error) {
        next(error)
    }
}