import { TransactionType } from "./transaction";

export interface Category {
    id: string;
    name: string;
    description: string;
}

export interface CreateCategoryRequest {
    name: string;
    description: string;
    type: TransactionType;
}