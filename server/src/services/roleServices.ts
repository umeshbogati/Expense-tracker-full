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