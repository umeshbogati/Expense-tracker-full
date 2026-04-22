import type { Category } from "./category";
export type TransactionType = "Income" | "Expense";
export interface Transaction {
    id: string;
    userId: string;
    amount: number;
    description: string;
    date: string;
    type: TransactionType;
    category: string;
    fileUrl?: string;
    createdAt: string;
    updatedAt: string;
}
export interface PopulatedTransaction extends Omit<Transaction, "category"> {
    category: Category;
}
export interface TransactionMeta {
    total: number;
    page: number;
    limit: number;
}
export interface PaginatedTransactions {
    data: PopulatedTransaction[];
    meta: TransactionMeta;
}
