import { uploadToCloudinary } from "./cloudinaryServices";
import { CreateTransactionRequest } from "../interfaces/transaction";
import CategoryModel from "../models/CategoryModel";
import TransactionModel from "../models/TransactionModel";

export const createTransaction = async (
  data: CreateTransactionRequest,
  userId: string,
) => {
  const { type, category, description, amount, date, file } = data;

  const existingCategory = await CategoryModel.findOne({ name: category });

  if (!existingCategory) {
    throw new Error("Category does not exist");
  }

  if (existingCategory.type !== type) {
    throw new Error("Category type does not match the transaction type");
  }

  //  FIXED TYPE
  let fileUrl: string | undefined;

  if (file) {
    try {
      console.log("Trying to upload file here....");

      const folderName = type === "Expense" ? "expenses" : "incomes";

      //  NO CASTING
      fileUrl = await uploadToCloudinary(file, folderName);
    } catch (error) {
      console.log("Error uploading file:", error);
      throw new Error("Error uploading file to Cloudinary");
    }
  }

   const transactionData: any = {
    userId,
    type,
    category: existingCategory._id,
    description,
    date: new Date(date),
    amount,
  };

  //  Only add fileUrl if it exists
  if (fileUrl) {
    transactionData.fileUrl = fileUrl;
  }

  //  Save to DB
  return await TransactionModel.create(transactionData);
};

// Get all transactions
export const getAll = async () => {
  return await TransactionModel.find({});
};