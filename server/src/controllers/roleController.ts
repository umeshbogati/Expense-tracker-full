import { Request, Response, NextFunction } from "express";
import { successResponse } from "../utils/responseHelper";
import * as roleServices from "../services/roleServices";

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