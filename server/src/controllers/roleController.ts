import { Request, Response, NextFunction } from "express";
import { errorResponse, successResponse } from "../utils/responseHelper";
import * as roleServices from "../services/roleServices";
import httpCodes from "../constants/httpCodes";

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await roleServices.create(req.body);

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
        const response = await roleServices.getAll();

        return successResponse(res, { data: response })
    }
    catch (error) {
        next(error);
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await roleServices.update(String(req.params.id), req.body);
        if (!response) return errorResponse(res, { status: httpCodes.NOT_FOUND.statusCode, message: "Role not found" });
        return successResponse(res, { data: response });
    } catch (error) {
        next(error);
    }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await roleServices.remove(String(req.params.id));
        return successResponse(res, { message: "Role deleted successfully" });
    } catch (error) {
        next(error);
    }
}