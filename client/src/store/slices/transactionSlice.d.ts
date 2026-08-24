import type { Transaction, PopulatedTransaction, PaginatedTransactions } from "../../interfaces/transaction";
export interface FetchUserTransactionsArg {
    userId: string;
    page?: number;
    limit?: number;
    type?: string;
    categoryId?: string;
    startDate?: string;
    endDate?: string;
}
export interface PaginatedTransactionData {
    data: PopulatedTransaction[];
    pagination: {
        page: number;
        limit: number;
        total: number;
    };
    stats: {
        totalIncome: number;
        totalExpenses: number;
    };
}
export interface TransactionState {
    transactions: Transaction[];
    userTransactions: PaginatedTransactionData;
    recentTransactions: PaginatedTransactionData;
    currentTransaction: PopulatedTransaction | null;
    loading: boolean;
    loadingUserTransactions: boolean;
    loadingRecentTransactions: boolean;
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
export declare const fetchUserTransactions: import("@reduxjs/toolkit").AsyncThunk<PaginatedTransactions, FetchUserTransactionsArg, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("@reduxjs/toolkit").ThunkDispatch<unknown, unknown, import("@reduxjs/toolkit").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const fetchRecentTransactions: import("@reduxjs/toolkit").AsyncThunk<PaginatedTransactions, FetchUserTransactionsArg, {
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
