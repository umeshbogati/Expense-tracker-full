import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as permissionApi from "../../api/permission";
import type { Permission } from "../../interfaces/permission";

export interface PermissionState {
    permissions: Permission[];
    loading: boolean;
}

const initialState: PermissionState = { permissions: [], loading: false };

export const fetchPermissions = createAsyncThunk<Permission[], void, { rejectValue: string }>(
    "permissions/fetchAll",
    async (_, thunkAPI) => {
        try {
            const res = await permissionApi.getAll();
            return res.data ?? [];
        } catch (error) {
            return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Failed to fetch permissions");
        }
    }
);

export const createPermission = createAsyncThunk<Permission, { name: string; description: string }, { rejectValue: string }>(
    "permissions/create",
    async (data, thunkAPI) => {
        try {
            const res = await permissionApi.create(data);
            return res.data as Permission;
        } catch (error) {
            return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Failed to create permission");
        }
    }
);

export const updatePermission = createAsyncThunk<Permission, { id: string; data: Partial<{ name: string; description: string }> }, { rejectValue: string }>(
    "permissions/update",
    async ({ id, data }, thunkAPI) => {
        try {
            const res = await permissionApi.update(id, data);
            return res.data as Permission;
        } catch (error) {
            return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Failed to update permission");
        }
    }
);

export const deletePermission = createAsyncThunk<string, string, { rejectValue: string }>(
    "permissions/delete",
    async (id, thunkAPI) => {
        try {
            await permissionApi.remove(id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Failed to delete permission");
        }
    }
);

const permissionSlice = createSlice({
    name: "permissions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPermissions.pending, (state) => { state.loading = true; })
            .addCase(fetchPermissions.fulfilled, (state, action) => { state.loading = false; state.permissions = action.payload; })
            .addCase(fetchPermissions.rejected, (state) => { state.loading = false; })
            .addCase(createPermission.fulfilled, (state, action) => { state.permissions.push(action.payload); })
            .addCase(updatePermission.fulfilled, (state, action) => {
                const idx = state.permissions.findIndex(p => p.id === action.payload.id);
                if (idx !== -1) state.permissions[idx] = action.payload;
            })
            .addCase(deletePermission.fulfilled, (state, action) => {
                state.permissions = state.permissions.filter(p => p.id !== action.payload);
            });
    },
});

export default permissionSlice.reducer;