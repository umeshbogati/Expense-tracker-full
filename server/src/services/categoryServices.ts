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