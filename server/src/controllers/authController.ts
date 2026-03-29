import { Request, Response, NextFunction } from "express";
import * as authServices from "../services/authServices";
import httpCodes from "../constants/httpCodes";
import { successResponse } from "../utils/responseHelper";
import { runInNewContext } from "node:vm";
import { ref } from "node:process";

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await authServices.register(req.body);

        return successResponse(res, { status: httpCodes.RESOURCE_CREATED.statusCode })

        res.status(httpCodes.RESOURCE_CREATED.statusCode).send({});
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await authServices.login(req.body);

        return successResponse(res, { data: response })
    }
    catch (error) {
        next(error);
    }
};

// logout, generateAccessTokenBasedOnRefreshToken

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.body;

        if(!refreshToken) {
            return res.status(httpCodes.BAD_REQUEST.statusCode).json({ message: "Refresh token is required"});
        }
        await authServices.logout(refreshToken);

        return successResponse(res, { message: "Logged out successfully"});
    } catch (error){
        next(error);
    }
};

export const generateAccessTokenBasedOnRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(httpCodes.BAD_REQUEST.statusCode).json({ message: "Refresh token required" });
    }

    const response = await authServices.generateAccessTokenBasedOnRefreshToken(refreshToken);

    return successResponse(res, { data: response });
  } catch (error) {
    next(error);
  }
};