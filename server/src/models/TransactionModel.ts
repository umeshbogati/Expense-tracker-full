import { Schema, model, Document, Types } from "mongoose";
import { TransactionType } from "../interfaces/transaction";
import { string } from "zod";

const TransactionTypeValues: TransactionType[] = ["Income", "Expense"];

export interface ITransaction extends Document {
  userId: Types.ObjectId;
  amount: number;
  description: string;
  date: Date;
  type: TransactionType;
  category: Types.ObjectId;
  fileUrl?: string;
}

const transactionSchema = new Schema<ITransaction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: TransactionTypeValues,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    fileUrl: {
      type: string,
      required: false,
      default: undefined,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        const { _id, __v, ...rest } = ret;
        return {
          id: _id,
          ...rest,
        };
      },
    },
  },
);

const TransactionModel = model<ITransaction>("Transaction", transactionSchema);

export default TransactionModel;
