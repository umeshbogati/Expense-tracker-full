import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/responseHelper";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { AuthenticateUser } from "../interfaces/user";

export interface AuthRequest extends Request {
  user?: AuthenticateUser;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return errorResponse(res, {
      status: 401,
      message: "No authorization token provided",
    });
  }

  try {
    const payload = jwt.verify(token, config.JWT_SECRET) as {
      userId: string;
      name: string;
      email: string;
      roles?: string[];
      permissions?: string[];
    };

    req.user = {
      id: payload.userId,
      name: payload.name,
      email: payload.email,
      roles: payload.roles || [],
      permissions: payload.permissions || [],
    };

    next();
  } catch (error) {
    return errorResponse(res, {
      status: 401,
      message: "Invalid or expired token",
    });
  }
};
