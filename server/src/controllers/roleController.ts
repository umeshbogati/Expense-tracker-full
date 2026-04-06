import { Request, Response, NextFunction } from "express";
import { successResponse } from "../utils/responseHelper";
import * as roleServices from "../services/roleServices";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await roleServices.create(req.body);
    return successResponse(res, { data: response });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await roleServices.getAll();
    return successResponse(res, { data: response });
  } catch (error) {
    next(error);
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roleId = String(req.params.roleId);
    const response = await roleServices.getById(roleId);
    return successResponse(res, { data: response });
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roleId = String(req.params.roleId);
    const response = await roleServices.update(roleId, req.body);
    return successResponse(res, { data: response });
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roleId = String(req.params.roleId);
    const response = await roleServices.remove(roleId);
    return successResponse(res, { data: response });
  } catch (error) {
    next(error);
  }
};

export const assignPermissions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { permissions } = req.body;
    if (!Array.isArray(permissions) || permissions.length === 0) {
      throw new Error("Permissions array is required");
    }

    const roleId = String(req.params.roleId);
    const response = await roleServices.assignPermissionsToRole(
      roleId,
      permissions,
    );
    return successResponse(res, { data: response });
  } catch (error) {
    next(error);
  }
};

export const removePermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roleId = String(req.params.roleId);
    const permissionId = String(req.params.permissionId);
    const response = await roleServices.removePermissionFromRole(
      roleId,
      permissionId,
    );
    return successResponse(res, { data: response });
  } catch (error) {
    next(error);
  }
};
