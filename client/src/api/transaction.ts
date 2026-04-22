import http from "../utils/http";
import type { Transaction, PopulatedTransaction, PaginatedTransactions } from "../interfaces/transaction";
import type { SuccessParams } from "../interfaces/response";

export const create = async (formData: FormData): Promise<SuccessParams<Transaction>> => {
    return http.post("/transactions", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const getAll = async (): Promise<SuccessParams<Transaction[]>> => {
    return http.get("/transactions");
};

export interface TransactionQueryParams {
    page?: number;
    limit?: number;
    type?: string;
}

export const getByUserId = async (userId: string, params?: TransactionQueryParams): Promise<SuccessParams<PaginatedTransactions>> => {
    // console.log("Fetching transactions for userId:", userId, "with params:", params);

    return http.get(`/transactions/user/${userId}`, { params });
};

export const getById = async (id: string): Promise<SuccessParams<PopulatedTransaction>> => {
    return http.get(`/transactions/${id}`);
};

export const update = async (id: string, formData: FormData): Promise<SuccessParams<PopulatedTransaction>> => {
    return http.put(`/transactions/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const remove = async (id: string): Promise<void> => {
    return http.delete(`/transactions/${id}`);
};