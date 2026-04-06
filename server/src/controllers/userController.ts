import { Request, Response, NextFunction } from "express";
import * as userServices from "../services/userServices";
import { successResponse } from "../utils/responseHelper";
import { AuthRequest } from "../middlewares/authenticate";
import appPermissions from "../constants/permission";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await userServices.getAll();
    return successResponse(res, { data: response });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const response = await userServices.getById(userId);
    return successResponse(res, { data: response });
  } catch (error) {
    next(error);
  }
};

export const getById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const requestedUserId = req.params.id;
    const currentUser = req.user;

    if (!currentUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (
      currentUser.id !== requestedUserId &&
      !currentUser.roles.includes("SUPER_ADMIN") &&
      !currentUser.permissions.includes(appPermissions.VIEW_USERS.name)
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const response = await userServices.getById(String(requestedUserId));
    return successResponse(res, { data: response });
  } catch (error) {
    next(error);
  }
};

export const assignRoles = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { roles } = req.body;
    if (!Array.isArray(roles) || roles.length === 0) {
      return res.status(400).json({ message: "Roles array is required" });
    }

    const response = await userServices.assignRolesToUser(
      String(req.params.id),
      roles,
    );
    return successResponse(res, { data: response });
  } catch (error) {
    next(error);
  }
};

export const removeRole = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await userServices.removeRoleFromUser(
      String(req.params.id),
      String(req.params.roleId),
    );
    return successResponse(res, { data: response });
  } catch (error) {
    next(error);
  }
};
