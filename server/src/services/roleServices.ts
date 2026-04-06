import mongoose from "mongoose";
import { createRoleRequest } from "../interfaces/role";
import RoleModel from "../models/RoleModel";
import PermissionModel from "../models/PermissionModel";

export const create = async (data: createRoleRequest) => {
  const { name, description, permissions } = data;

  const existingRole = await RoleModel.findOne({ name });
  if (existingRole) {
    throw new Error("Role already exists");
  }

  let permissionIds: mongoose.Types.ObjectId[] = [];
  if (permissions && permissions.length > 0) {
    const perms = await PermissionModel.find({ name: { $in: permissions } });
    permissionIds = perms.map((p) => p._id);

    if (permissionIds.length !== permissions.length) {
      throw new Error("One or more permissions do not exist");
    }
  }

  return RoleModel.create({
    name,
    description,
    ...(permissionIds.length > 0 && { permissions: permissionIds }),
  });
};

export const getAll = async () => {
  return await RoleModel.find().populate("permissions");
};

export const getById = async (roleId: string) => {
  const role = await RoleModel.findById(roleId).populate("permissions");
  if (!role) throw new Error("Role not found");
  return role;
};

export const update = async (roleId: string, data: createRoleRequest) => {
  const role = await RoleModel.findById(roleId);
  if (!role) throw new Error("Role not found");

  if (data.name && data.name !== role.name) {
    const existingRole = await RoleModel.findOne({ name: data.name });
    if (existingRole) {
      throw new Error("Role already exists");
    }
  }

  role.name = data.name;
  role.description = data.description;

  if (data.permissions) {
    const perms = await PermissionModel.find({
      name: { $in: data.permissions },
    });
    if (perms.length !== data.permissions.length) {
      throw new Error("One or more permissions do not exist");
    }
    role.permissions = perms.map((p) => p._id);
  }

  await role.save();
  return await role.populate("permissions");
};

export const remove = async (roleId: string) => {
  const deleted = await RoleModel.findByIdAndDelete(roleId);
  if (!deleted) throw new Error("Role not found");
  return deleted;
};

export const assignPermissionsToRole = async (
  roleId: string,
  permissionNames: string[],
) => {
  const role = await RoleModel.findById(roleId);
  if (!role) throw new Error("Role not found");

  const permissions = await PermissionModel.find({
    name: { $in: permissionNames },
  });
  if (permissions.length !== permissionNames.length) {
    throw new Error("One or more permissions do not exist");
  }

  const currentIds = role.permissions?.map((id) => id.toString()) ?? [];
  const newIds = permissions
    .map((permission) => permission._id.toString())
    .filter((id) => !currentIds.includes(id));

  role.permissions = [
    ...(role.permissions ?? []),
    ...newIds.map((id) => new mongoose.Types.ObjectId(id)),
  ];

  await role.save();
  return await role.populate("permissions");
};

export const removePermissionFromRole = async (
  roleId: string,
  permissionId: string,
) => {
  const role = await RoleModel.findById(roleId);
  if (!role) throw new Error("Role not found");

  role.permissions = (role.permissions ?? []).filter(
    (permission) => permission.toString() !== permissionId,
  );

  await role.save();
  return await role.populate("permissions");
};
