import { Types } from "mongoose";
import cloudinary from "../configurations/cloudinary";
import { CreateTransactionRequest } from "../interfaces/transaction";
import CategoryModel from "../models/CategoryModel";
import TransactionModel from "../models/TransactionModel";
import * as cloudinaryServices from "./cloudinaryServices";
import { logger } from "../utils/logger";

export const createTransaction =  async (data: CreateTransactionRequest, userId: string) => {
    const { type, category, description, amount, date, file } = data;

    const existingCategory = await CategoryModel.findOne({ name: category });

    if (!existingCategory) {
        throw new Error("Category does not exist");
    }

    // If Food is category, it is of "Expense" type
    // When sending request, we should be sending "Expense" as a category either through postman or FE
    if (existingCategory.type !== type) {
        throw new Error("Category type does not match the transaction type")
    }

    let fileUrl = null;

    if (file) {
        try {
            console.log("Trying to upload file here....");

            let folderName = type === "Expense" ? "expenses" : "incomes";

            // Assignment: Move this into a separate service
            const uploaded = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({
                    folder: folderName,
                }, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(result);
                    }
                }).end((file as any).buffer);
            });

            fileUrl = (uploaded as any).secure_url;
        }
        catch (error) {
            console.error("Error uploading file to cloudinary", error);
            throw new Error(`Error uploading file to cloudinary: ${error}`);
        }
    }

    return await TransactionModel.create({
        userId,
        type,
        category: existingCategory._id,
        description,
        date: new Date(date),
        fileUrl,
        amount
    })
}


export const getAll = async () => {
    return await TransactionModel.find({});
}

export interface TransactionQueryOPtions {
    page?: number | undefined;
    limit?: number | undefined;
    type?: string | undefined;
}

export const getByUserId = async (userId: string, query: TransactionQueryOPtions) => {
    const { page = 1, limit = 10, type } = query;
    const filter: Record<string, unknown> = { userId: new Types.ObjectId(userId) };

    logger.info(`[TRANSACTION-SERVICES] Fetching transactions for userId: ${userId}, page: ${page}, limit: ${limit}, type: ${type}`);

    if (type) {
        filter.type = type;
    }

    // For pagination, we can use skip and limit
    // "Skip" will skip the first (page-1)*limit records and "limit" will limit the number of records returned to the specified limit
    const skip = (Number(page) - 1) * Number(limit);

    const [data, total, statsResult] = await Promise.all([
        TransactionModel.find(filter).populate("category").sort({ date: -1 }).skip(skip).limit(Number(limit)),
        TransactionModel.countDocuments(filter),
        TransactionModel.aggregate([
            { $match: { userId: new Types.ObjectId(userId) } },
            {
                $group: {
                    _id: "$type",
                    totalAmount: { $sum: "$amount" }
                },
            }
        ])
    ]) 

    const totalIncome = (statsResult.find((s) => s._id === "Income")?.total as number) ?? 0;
    const totalExpenses = (statsResult.find((s) => s._id === "Expense")?.total as number) ?? 0;
    
    const meta = {
        total,
        page: Number(page),
        limit: Number(limit),
        totalIncome,
        totalExpenses
    }

    return { data, meta }
}

export const getById = async (id: string) => {
    return await TransactionModel.findById(id).populate("category");
}

export const updateTransaction = async (id: string, data: Partial<CreateTransactionRequest>, userId: string) => {
    const transaction = await TransactionModel.findById(id);

    if (!transaction) throw new Error("Transaction not found");
    if (transaction.userId.toString() !== userId) throw new Error("Forbidden");

    const { type, category, amount, description, date, file } = data;

    let categoryId = transaction.category;
    let resolvedType = type ?? transaction.type;

    if (category) {
        const existingCategory = await CategoryModel.findOne({ name: category });
        if (!existingCategory) throw new Error("Invalid category");
        if (existingCategory.type !== resolvedType) throw new Error("Category type does not match transaction type");
        categoryId = existingCategory._id;
    }

    let receiptUrl = transaction.fileUrl;

    if (file) {
        if (transaction.fileUrl) {
            await cloudinaryServices.deleteFromCloudinary(transaction.fileUrl);
        }
        try {
            receiptUrl = await cloudinaryServices.uploadToCloudinary(file as unknown as Express.Multer.File);
        } catch {
            throw new Error("Error uploading file to Cloudinary");
        }
    }

    return await TransactionModel.findByIdAndUpdate(
        id,
        {
            ...(type && { type }),
            ...(category && { category: categoryId }),
            ...(amount && { amount }),
            ...(description && { description }),
            ...(date && { date: new Date(date) }),
            fileUrl: receiptUrl,
        },
        { new: true }
    ).populate("category");
}

export const deleteTransaction = async (id: string, userId: string) => {
    const transaction = await TransactionModel.findById(id);

    if (!transaction) throw new Error("Transaction not found");
    if (transaction.userId.toString() !== userId) throw new Error("Forbidden");

    if (transaction.fileUrl) {
        await cloudinaryServices.deleteFromCloudinary(transaction.fileUrl);
    }

    await TransactionModel.findByIdAndDelete(id);
}