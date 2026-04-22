import http from "../utils/http";
import type { Category } from "../interfaces/category";
import type { SuccessParams } from "../interfaces/response";

export const getAll = async (): Promise<SuccessParams<Category[]>> => {
    return http.get("/categories");
};

export const create = async (data: { name: string; description: string; type: "Income" | "Expense" }): Promise<SuccessParams<Category>> => {
    return http.post("/categories", data);
};

export const update = async (id: string, data: Partial<{ name: string; description: string; type: "Income" | "Expense" }>): Promise<SuccessParams<Category>> => {
    return http.put(`/categories/${id}`, data);
};

export const remove = async (id: string): Promise<void> => {
    return http.delete(`/categories/${id}`);
};