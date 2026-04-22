import { Request, Response, NextFunction } from "express";
import { errorResponse, successResponse } from "../utils/responseHelper";
import * as transactionServices from "../services/transactionServices";
import { AuthRequest } from "../middlewares/authenticate";
import httpCodes from "../constants/httpCodes";
import appPermissions from "../constants/permission";

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

export const getByUserId = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = String(req.params.id);

        const { page, limit, type } = req.query;

        const { data, meta } = await transactionServices.getByUserId(id, {
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
            type: type ? String(type) : undefined
        });

        return successResponse(res, { data, meta });
    } catch (error) {
        next(error);
    }
}

export const getById = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = String(req.params.id);
        const transaction = await transactionServices.getById(id);

        if (!transaction) {
            return errorResponse(res, { status: httpCodes.NOT_FOUND.statusCode, message: "Transaction not found" });
        }

        const user = req.user!;
        const isSelf = transaction.userId.toString() === user.userId;
        const isSuperAdmin = user.roles?.includes("SUPER_ADMIN");
        const hasPermission = user.permissions?.includes(appPermissions.VIEW_TRANSACTIONS.name);

        if (!isSelf && !isSuperAdmin && !hasPermission) {
            return errorResponse(res, { status: httpCodes.FORBIDDEN.statusCode, message: "You do not have permission to view this transaction" });
        }

        return successResponse(res, { data: transaction });
    } catch (error) {
        next(error);
    }
}

export const update = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return errorResponse(res, { status: httpCodes.UNAUTHORIZED.statusCode, message: "Unauthorized" });

        const id = String(req.params.id);
        const data = { ...req.body, file: req.file };
        const response = await transactionServices.updateTransaction(id, data, userId);
        return successResponse(res, { data: response });
    } catch (error: any) {
        if (error.message === "Forbidden") {
            return errorResponse(res, { status: httpCodes.FORBIDDEN.statusCode, message: "You cannot update this transaction" });
        }
        next(error);
    }
}

export const remove = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return errorResponse(res, { status: httpCodes.UNAUTHORIZED.statusCode, message: "Unauthorized" });

        const id = String(req.params.id);
        await transactionServices.deleteTransaction(id, userId);
        return successResponse(res, { message: "Transaction deleted successfully" });
    } catch (error: any) {
        if (error.message === "Forbidden") {
            return errorResponse(res, { status: httpCodes.FORBIDDEN.statusCode, message: "You cannot delete this transaction" });
        }
        next(error);
    }
}