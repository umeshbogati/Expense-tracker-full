import type { Transaction, PopulatedTransaction, PaginatedTransactions } from "../interfaces/transaction";
import type { SuccessParams } from "../interfaces/response";
export declare const create: (formData: FormData) => Promise<SuccessParams<Transaction>>;
export declare const getAll: () => Promise<SuccessParams<Transaction[]>>;
export interface TransactionQueryParams {
    page?: number;
    limit?: number;
    type?: string;
}
export declare const getByUserId: (userId: string, params?: TransactionQueryParams) => Promise<SuccessParams<PaginatedTransactions>>;
export declare const getById: (id: string) => Promise<SuccessParams<PopulatedTransaction>>;
export declare const update: (id: string, formData: FormData) => Promise<SuccessParams<PopulatedTransaction>>;
export declare const remove: (id: string) => Promise<void>;
