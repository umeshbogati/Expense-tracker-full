import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAll, getById, getMe } from "../../api/user";
const initialState = {
    users: {},
    loadingById: {},
    loadingAll: false,
    errorById: {},
    errorAll: null
};
export const fetchUsers = createAsyncThunk("users/getAll", async (_, thunkAPI) => {
    try {
        const response = await getAll();
        return response.data ?? [];
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return thunkAPI.rejectWithValue(message);
    }
});
export const fetchUserById = createAsyncThunk("users/fetchById", async (id, thunkAPI) => {
    try {
        const response = await getById(id);
        return response.data;
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch user";
        return thunkAPI.rejectWithValue(message);
    }
});
export const fetchMe = createAsyncThunk("users/fetchMe", async (_, thunkAPI) => {
    try {
        const response = await getMe();
        return response.data;
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch user";
        return thunkAPI.rejectWithValue(message);
    }
});
export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loadingAll = true;
            state.errorAll = null;
        })
            .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loadingAll = false;
            action.payload.forEach((user) => {
                state.users[user.id] = user;
            });
        })
            .addCase(fetchUsers.rejected, (state, action) => {
            state.loadingAll = false;
            state.errorAll = typeof action.payload === "string" ? action.payload : "Error while fetching users";
        })
            .addCase(fetchUserById.pending, (state, action) => {
            const id = action.meta.arg;
            state.loadingById[id] = true;
            state.errorById[id] = null;
        })
            .addCase(fetchUserById.fulfilled, (state, action) => {
            const id = action.meta.arg;
            state.loadingById[id] = false;
            if (!action.payload) {
                return;
            }
            state.users[id] = action.payload;
        })
            .addCase(fetchUserById.rejected, (state, action) => {
            const id = action.meta.arg;
            state.loadingById[id] = false;
            state.errorById[id] = typeof action.payload === "string" ? action.payload : "Error while fetching user";
        })
            .addCase(fetchMe.pending, (state, action) => {
            state.loadingById[action.meta.arg] = true;
            state.errorById[action.meta.arg] = null;
        })
            .addCase(fetchMe.fulfilled, (state, action) => {
            const id = action.meta.arg;
            state.loadingById[id] = false;
            if (!action.payload) {
                return;
            }
            const user = action.payload;
            state.users[user.id] = user;
        })
            .addCase(fetchMe.rejected, (state, action) => {
            const id = action.meta.arg;
            state.loadingById[id] = false;
            state.errorById[id] = typeof action.payload === "string" ? action.payload : "Unable to load user";
        });
    }
});
export default userSlice.reducer;
