import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { create, getAll, getByUserId, getById, update, remove } from "../../api/transaction";
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
    pagination: { page: number; limit: number; total: number };
    stats: { totalIncome: number; totalExpenses: number };   
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

const initialState: TransactionState = {
    transactions: [],
    userTransactions: {
        data: [],
        pagination: { page: 1, limit: 10, total: 0 },
        stats: { totalIncome: 0, totalExpenses: 0 },
    },
    recentTransactions: {
        data: [],
        pagination: { page: 1, limit: 5, total: 0 },
        stats: { totalIncome: 0, totalExpenses: 0 },
    },
    currentTransaction: null,
    loading: false,
    loadingUserTransactions: false,
    loadingRecentTransactions: false,
    loadingById: false,
};

export const fetchTransactions = createAsyncThunk<Transaction[], void, { rejectValue: string }>(
    "transactions/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await getAll();
            return response.data ?? [];
        } catch (error) {
            return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Failed to fetch transactions");
        }
    }
);

export const fetchUserTransactions = createAsyncThunk<PaginatedTransactions, FetchUserTransactionsArg, { rejectValue: string }>(
    "transactions/fetchByUserId",
    async ({ userId, ...params }, thunkAPI) => {
        try {
            const response = await getByUserId(userId, params);
            return { data: response.data ?? [], meta: response.meta } as PaginatedTransactions;
        } catch (error) {
            return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Failed to fetch transactions");
        }
    }
);

export const fetchRecentTransactions = createAsyncThunk<PaginatedTransactions, FetchUserTransactionsArg, { rejectValue: string }>(
    "transactions/fetchRecent",
    async ({ userId, ...params }, thunkAPI) => {
        try {
            const response = await getByUserId(userId, params);
            return { data: response.data ?? [], meta: response.meta } as PaginatedTransactions;
        } catch (error) {
            return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Failed to fetch transactions");
        }
    }
);

export const fetchTransactionById = createAsyncThunk<PopulatedTransaction, string, { rejectValue: string }>(
    "transactions/fetchById",
    async (id, thunkAPI) => {
        try {
            const response = await getById(id);
            return response.data as PopulatedTransaction;
        } catch (error) {
            return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Failed to fetch transaction");
        }
    }
);

export const updateTransaction = createAsyncThunk<PopulatedTransaction, { id: string; formData: FormData }, { rejectValue: string }>(
    "transactions/update",
    async ({ id, formData }, thunkAPI) => {
        try {
            const response = await update(id, formData);
            return response.data as PopulatedTransaction;
        } catch (error) {
            return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Failed to update transaction");
        }
    }
);

export const deleteTransaction = createAsyncThunk<string, string, { rejectValue: string }>(
    "transactions/delete",
    async (id, thunkAPI) => {
        try {
            await remove(id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Failed to delete transaction");
        }
    }
);

export const createTransaction = createAsyncThunk<Transaction, FormData, { rejectValue: string }>(
    "transactions/create",
    async (formData, thunkAPI) => {
        try {
            const response = await create(formData);
            return response.data as Transaction;
        } catch (error) {
            return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Failed to create transaction");
        }
    }
);

export const transactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => { state.loading = true; })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state) => { state.loading = false; })

            .addCase(fetchUserTransactions.pending, (state) => { state.loadingUserTransactions = true; })
            .addCase(fetchUserTransactions.fulfilled, (state, action) => {
                state.loadingUserTransactions = false;
                state.userTransactions = {
                    data: action.payload.data,
                    pagination: {
                        page: action.payload.meta.page,
                        limit: action.payload.meta.limit,
                        total: action.payload.meta.total,
                    },
                    stats: {
                        totalIncome: action.payload.meta.totalIncome,
                        totalExpenses: action.payload.meta.totalExpenses,
                    },
                };
            })
            .addCase(fetchUserTransactions.rejected, (state) => { state.loadingUserTransactions = false; })

            .addCase(fetchRecentTransactions.pending, (state) => { state.loadingRecentTransactions = true; })
            .addCase(fetchRecentTransactions.fulfilled, (state, action) => {
                console.log("Fetched recent transactions:", action.payload);


                state.loadingRecentTransactions = false;
                state.recentTransactions = {
                    data: action.payload.data,
                    pagination: {
                        page: action.payload.meta.page,
                        limit: action.payload.meta.limit,
                        total: action.payload.meta.total,
                    },
                    stats: {
                        totalIncome: action.payload.meta.totalIncome,
                        totalExpenses: action.payload.meta.totalExpenses,
                    },
                };
            })
            .addCase(fetchRecentTransactions.rejected, (state) => { state.loadingRecentTransactions = false; })

            .addCase(fetchTransactionById.pending, (state) => {
                state.loadingById = true;
                state.currentTransaction = null;
            })
            .addCase(fetchTransactionById.fulfilled, (state, action) => {
                state.loadingById = false;
                state.currentTransaction = action.payload;
            })
            .addCase(fetchTransactionById.rejected, (state) => { state.loadingById = false; })

            .addCase(createTransaction.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions.unshift(action.payload);
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                const idx = state.userTransactions.data.findIndex(t => t.id === action.payload.id);
                if (idx !== -1) state.userTransactions.data[idx] = action.payload;
                const ridx = state.recentTransactions.data.findIndex(t => t.id === action.payload.id);
                if (ridx !== -1) state.recentTransactions.data[ridx] = action.payload;
                if (state.currentTransaction?.id === action.payload.id) state.currentTransaction = action.payload;
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.userTransactions.data = state.userTransactions.data.filter(t => t.id !== action.payload);
                state.recentTransactions.data = state.recentTransactions.data.filter(t => t.id !== action.payload);
                if (state.currentTransaction?.id === action.payload) state.currentTransaction = null;
            });
    },
});

export default transactionSlice.reducer;