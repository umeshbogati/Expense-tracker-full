import type { Transaction, PopulatedTransaction, PaginatedTransactions } from "../../interfaces/transaction";
export interface TransactionState {
    transactions: Transaction[];
    userTransactions: PopulatedTransaction[];
    currentTransaction: PopulatedTransaction | null;
    pagination: {
        page: number | undefined;
        limit: number | undefined;
        total: number | undefined;
    };
    loading: boolean;
    loadingUserTransactions: boolean;
    loadingById: boolean;
}
export declare const fetchTransactions: import("@reduxjs/toolkit").AsyncThunk<Transaction[], void, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("@reduxjs/toolkit").ThunkDispatch<unknown, unknown, import("@reduxjs/toolkit").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
interface FetchUserTransactionsParams {
    userId: string;
    page?: number;
    limit?: number;
    type?: string;
}
export declare const fetchUserTransactions: import("@reduxjs/toolkit").AsyncThunk<PaginatedTransactions, FetchUserTransactionsParams, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("@reduxjs/toolkit").ThunkDispatch<unknown, unknown, import("@reduxjs/toolkit").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const fetchTransactionById: import("@reduxjs/toolkit").AsyncThunk<PopulatedTransaction, string, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("@reduxjs/toolkit").ThunkDispatch<unknown, unknown, import("@reduxjs/toolkit").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const updateTransaction: import("@reduxjs/toolkit").AsyncThunk<PopulatedTransaction, {
    id: string;
    formData: FormData;
}, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("@reduxjs/toolkit").ThunkDispatch<unknown, unknown, import("@reduxjs/toolkit").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const deleteTransaction: import("@reduxjs/toolkit").AsyncThunk<string, string, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("@reduxjs/toolkit").ThunkDispatch<unknown, unknown, import("@reduxjs/toolkit").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const createTransaction: import("@reduxjs/toolkit").AsyncThunk<Transaction, FormData, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("@reduxjs/toolkit").ThunkDispatch<unknown, unknown, import("@reduxjs/toolkit").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const transactionSlice: import("@reduxjs/toolkit").Slice<TransactionState, {}, "transactions", "transactions", import("@reduxjs/toolkit").SliceSelectors<TransactionState>>;
declare const _default: import("@reduxjs/toolkit").Reducer<TransactionState>;
export default _default;
