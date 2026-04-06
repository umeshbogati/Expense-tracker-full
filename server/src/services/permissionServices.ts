import { PermissionRequest } from "../interfaces/permission";
import PermissionModel from "../models/PermissionModel";

export const create = async (data: PermissionRequest) => {
  const { name, description } = data;

  const existingPermission = await PermissionModel.findOne({ name });
  if (existingPermission) {
    throw new Error("Permission already exists");
  }

  return await PermissionModel.create({ name, description });
};

export const getAll = async () => {
  return await PermissionModel.find({});
};

export const getById = async (permissionId: string) => {
  const permission = await PermissionModel.findById(permissionId);
  if (!permission) throw new Error("Permission not found");
  return permission;
};

export const update = async (permissionId: string, data: PermissionRequest) => {
  const permission = await PermissionModel.findById(permissionId);
  if (!permission) throw new Error("Permission not found");

  if (data.name !== permission.name) {
    const existingPermission = await PermissionModel.findOne({
      name: data.name,
    });
    if (existingPermission) {
      throw new Error("Permission already exists");
    }
  }

  permission.name = data.name;
  permission.description = data.description;

  return await permission.save();
};

export const remove = async (permissionId: string) => {
  const deleted = await PermissionModel.findByIdAndDelete(permissionId);
  if (!deleted) throw new Error("Permission not found");
  return deleted;
};
