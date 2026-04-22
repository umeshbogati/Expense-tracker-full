import {NextFunction, Request, Response } from "express";
import {AuthRequest} from "./authenticate";
import { SelfPermissions } from "../constants/permission";

export interface AuthorizeOptions {
    permissions: string;
    selfPermissions?: string
}

export const authorizeWithPermission = (options: AuthorizeOptions) => {
    const { permissions, selfPermissions } = options;

    return async (req: AuthRequest, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user) {
            return next(new Error("User not authenticated"));
        }
          //This  will move to the next service handler in the router
        if (user?.roles.includes("SUPER_ADMIN")) {
            return next();
        }

        if (selfPermissions === SelfPermissions.GRANTED &&
            (req.params.id === user.userId || req.query.id === user.userId)) {
                return next();
            }

        const userPermissions = user.permissions || [];

        const isAuthorized = userPermissions.includes(permissions);

        if(!isAuthorized) {
            return next(new Error("User does not have the required permissions"));
        }
        next();
    }
}