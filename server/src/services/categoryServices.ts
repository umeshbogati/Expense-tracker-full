import { CreateCategoryRequest } from "../interfaces/category";
import CategoryModel from "../models/CategoryModel";

export const create = async (data: CreateCategoryRequest) => {
    const { name, description, type } = data;

    const existingPermission = await CategoryModel.findOne({ name });

    if (existingPermission) {
        throw new Error("Permission already exists");
    }

    return await CategoryModel.create({
        name,
        description,
        type
    });
}   

export const getAll = async () => {
    return await CategoryModel.find({});
}

export const update = async (id: string, data: Partial<CreateCategoryRequest>) => {
    const { name } = data;

    if (name) {
        const conflict = await CategoryModel.findOne({ name, _id: { $ne: id } });
        if (conflict) throw new Error("A category with that name already exists");
    }

    return await CategoryModel.findByIdAndUpdate(id, { ...data }, { new: true });
}

export const remove = async (id: string) => {
    const category = await CategoryModel.findById(id);
    if (!category) throw new Error("Category not found");
    await CategoryModel.findByIdAndDelete(id);
}