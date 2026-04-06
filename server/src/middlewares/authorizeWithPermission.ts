import {NextFunction, Request, Response } from "express";
import {AuthRequest} from "./authenticate";

export interface AuthorizeOptions {
    permissions: string;
}

export const authorizeWithPermission = (options: AuthorizeOptions) => {
    const { permissions } = options;

    return async (req: AuthRequest, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user) {
            return next(new Error("User not authenticated"));
        }

        if (user?.roles.includes("SUPER_ADMIN")) {
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