import { Schema, model, Document, Types} from "mongoose";
import { TransactionType } from "../interfaces/transaction";
import { _discriminatedUnion } from "zod/v4/core";

const TransactionTypeValues: TransactionType[] = ["Income", "Expense"];


export interface ICategory extends Document {
    name: string;
    description: string;
    type: TransactionType
}

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: TransactionTypeValues,
        required: true
    }
},{
    timestamps: true,
    toJSON: {
        transform: (_, ret) => {
            const {_id, __v, ...rest} = ret;
            return {
                id: _id,
                ...rest
            }
        }
    }
})

const CategoryModel = model<ICategory>("Category", categorySchema);
export default CategoryModel;