import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Category } from "../../interfaces/category";
import * as categoryApi from "../../api/category";

export interface CategoryState {
    categories: Category[];
    loading: boolean;
}

const initialState: CategoryState = { categories: [], loading: false };

export const fetchCategories = createAsyncThunk<Category[], void, { rejectValue: string }>(
    "categories/fetchAll",
    async (_, thunkAPI) => {
        try {
            const res = await categoryApi.getAll();
            return res.data ?? [];
        } catch (error) {
            return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Failed to fetch categories");
        }
    }
);

export const createCategory = createAsyncThunk<Category, { name: string; description: string; type: "Income" | "Expense" }, { rejectValue: string }>(
    "categories/create",
    async (data, thunkAPI) => {
        try {
            const res = await categoryApi.create(data);
            return res.data as Category;
        } catch (error) {
            return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Failed to create category");
        }
    }
);

export const updateCategory = createAsyncThunk<Category, { id: string; data: Partial<{ name: string; description: string; type: "Income" | "Expense" }> }, { rejectValue: string }>(
    "categories/update",
    async ({ id, data }, thunkAPI) => {
        try {
            const res = await categoryApi.update(id, data);
            return res.data as Category;
        } catch (error) {
            return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Failed to update category");
        }
    }
);

export const deleteCategory = createAsyncThunk<string, string, { rejectValue: string }>(
    "categories/delete",
    async (id, thunkAPI) => {
        try {
            await categoryApi.remove(id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Failed to delete category");
        }
    }
);

export const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => { state.loading = true; })
            .addCase(fetchCategories.fulfilled, (state, action) => { state.loading = false; state.categories = action.payload; })
            .addCase(fetchCategories.rejected, (state) => { state.loading = false; })
            .addCase(createCategory.fulfilled, (state, action) => { state.categories.push(action.payload); })
            .addCase(updateCategory.fulfilled, (state, action) => {
                const idx = state.categories.findIndex(c => c.id === action.payload.id);
                if (idx !== -1) state.categories[idx] = action.payload;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(c => c.id !== action.payload);
            });
    },
});

export default categorySlice.reducer;