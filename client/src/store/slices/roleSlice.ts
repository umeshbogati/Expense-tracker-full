import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as roleApi from "../../api/role";
import type { RoleWithPermission } from "../../interfaces/role";

export interface RoleState {
    roles: RoleWithPermission[];
    loading: boolean;
}

const initialState: RoleState = { roles: [], loading: false };

export const fetchRoles = createAsyncThunk<RoleWithPermission[], void, { rejectValue: string }>(
    "roles/fetchAll",
    async (_, thunkAPI) => {
        try {
            const res = await roleApi.getAll();
            return res.data ?? [];
        } catch (error) {
            return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Failed to fetch roles");
        }
    }
);

export const createRole = createAsyncThunk<RoleWithPermission, { name: string; description: string; permissions?: string[] }, { rejectValue: string }>(
    "roles/create",
    async (data, thunkAPI) => {
        try {
            const res = await roleApi.create(data);
            return res.data as RoleWithPermission;
        } catch (error) {
            return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Failed to create role");
        }
    }
);

export const updateRole = createAsyncThunk<RoleWithPermission, { id: string; data: Partial<{ name: string; description: string; permissions: string[] }> }, { rejectValue: string }>(
    "roles/update",
    async ({ id, data }, thunkAPI) => {
        try {
            const res = await roleApi.update(id, data);
            return res.data as RoleWithPermission;
        } catch (error) {
            return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Failed to update role");
        }
    }
);

export const deleteRole = createAsyncThunk<string, string, { rejectValue: string }>(
    "roles/delete",
    async (id, thunkAPI) => {
        try {
            await roleApi.remove(id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Failed to delete role");
        }
    }
);

const roleSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoles.pending, (state) => { state.loading = true; })
            .addCase(fetchRoles.fulfilled, (state, action) => { state.loading = false; state.roles = action.payload; })
            .addCase(fetchRoles.rejected, (state) => { state.loading = false; })
            .addCase(createRole.fulfilled, (state, action) => { state.roles.push(action.payload); })
            .addCase(updateRole.fulfilled, (state, action) => {
                const idx = state.roles.findIndex(r => r.id === action.payload.id);
                if (idx !== -1) state.roles[idx] = action.payload;
            })
            .addCase(deleteRole.fulfilled, (state, action) => {
                state.roles = state.roles.filter(r => r.id !== action.payload);
            });
    },
});

export default roleSlice.reducer;