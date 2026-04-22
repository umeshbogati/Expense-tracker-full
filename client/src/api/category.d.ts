import type { Category } from "../interfaces/category";
import type { SuccessParams } from "../interfaces/response";
export declare const getAll: () => Promise<SuccessParams<Category[]>>;
export declare const create: (data: {
    name: string;
    description: string;
    type: "Income" | "Expense";
}) => Promise<SuccessParams<Category>>;
export declare const update: (id: string, data: Partial<{
    name: string;
    description: string;
    type: "Income" | "Expense";
}>) => Promise<SuccessParams<Category>>;
export declare const remove: (id: string) => Promise<void>;
