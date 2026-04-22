import mongoose from "mongoose";
import RoleModel from "../models/RoleModel";
import PermissionModel from "../models/PermissionModel";
import { CreateRoleWithPermissionRequest } from "../interfaces/role";

export const create = async (data: CreateRoleWithPermissionRequest) => {
    const { name, description, permissions } = data;

    const existingRole = await RoleModel.findOne({ name });

    if (existingRole) {
        throw new Error("Role already exists");
    }

    let permissionIds: mongoose.Types.ObjectId [] = [];

    if (permissions && permissions.length > 0) {
        const perms = await PermissionModel.find({ name: {$in: permissions }});

        // Get "ids" of permissions returned from the database and assign it to permissionIds array
        permissionIds = perms.map(p => p._id);

        // Check if all permissions provided in the request exist in the database
        if (permissionIds.length !== permissions.length) {
            throw new Error("One or more permissions do not exist");
        }
    }

    return RoleModel.create({
        name,
        description,
        ...(permissionIds.length > 0 && { permissions: permissionIds })
    })   
}

export const getAll = async () => {
    return await RoleModel.find().populate("permissions");
}

export const update = async (id: string, data: Partial<CreateRoleWithPermissionRequest>) => {
    const { name, description, permissions } = data;

    if (name) {
        const conflict = await RoleModel.findOne({ name, _id: { $ne: id } });
        if (conflict) throw new Error("A role with that name already exists");
    }

    let permissionIds: mongoose.Types.ObjectId[] | undefined;
    if (permissions !== undefined) {
        if (permissions.length > 0) {
            const perms = await PermissionModel.find({ name: { $in: permissions } });
            permissionIds = perms.map(p => p._id as mongoose.Types.ObjectId);
            if (permissionIds.length !== permissions.length) throw new Error("Some permissions do not exist");
        } else {
            permissionIds = [];
        }
    }

    return await RoleModel.findByIdAndUpdate(
        id,
        {
            ...(name && { name }),
            ...(description && { description }),
            ...(permissionIds !== undefined && { permissions: permissionIds }),
        },
        { new: true }
    ).populate("permissions");
}

export const remove = async (id: string) => {
    const role = await RoleModel.findById(id);
    if (!role) throw new Error("Role not found");
    await RoleModel.findByIdAndDelete(id);
}