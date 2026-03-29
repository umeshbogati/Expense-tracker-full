import {Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/responseHelper";
import jwt from "jsonwebtoken";
import { config } from "../config";

export interface UserRequest extends Request {
    user?: any;
}

export const authenticate = (
    req: UserRequest,
    res: Response,
    next: NextFunction

) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return errorResponse(res, { status: 401, message: "No authorization token provided"});
    }
    req.user = jwt.verify(token, config.JWT_SECRET);
    next();
}
   