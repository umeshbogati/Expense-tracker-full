import { CreatePermissionRequest } from "../interfaces/permission";
import PermissionModel from "../models/PermissionModel";

export const create = async (data: CreatePermissionRequest) => {
    const { name, description } = data;

    const existingPermission = await PermissionModel.findOne({name });

    if (existingPermission) {
        throw new Error("Permission already exists");
    }

    return await PermissionModel.create({ name, description });
}

export const getAll = async () => {
    return await PermissionModel.find({});
}

export const update = async (id: string, data: Partial<CreatePermissionRequest>) => {
    const { name } = data;

    if (name) {
        const conflict = await PermissionModel.findOne({ name, _id: { $ne: id } });
        if (conflict) throw new Error("A permission with that name already exists");
    }

    return await PermissionModel.findByIdAndUpdate(id, { ...data }, { new: true });
}

export const remove = async (id: string) => {
    const permission = await PermissionModel.findById(id);
    if (!permission) throw new Error("Permission not found");
    await PermissionModel.findByIdAndDelete(id);
}