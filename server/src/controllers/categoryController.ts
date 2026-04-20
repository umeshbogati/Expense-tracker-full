import { Request, Response, NextFunction } from "express";
import { successResponse } from "../utils/responseHelper";
import * as categoryServices from "../services/categoryServices";


export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await categoryServices.create(req.body);
        return successResponse(res, {data: response})
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
        const response = await categoryServices.getAll();
        return successResponse(res, { data: response })
    }
    catch (error){
        next(error);
    }
}