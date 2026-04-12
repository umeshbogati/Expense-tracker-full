import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearTokens, getAccessToken, getDecodedToken, getRefreshToken, setAccessToken, setRefreshToken } from "../../utils/token";
import type { LoginFormData } from "../../pages/Login";
import { login, register, type LogoutData } from "../../api/auth";
import type { RegisterFormData } from "../../pages/Register";

export interface AuthState {
    userId: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    roles: string[];
    permissions: string[];
    loading: boolean;
    isAuthenticated: boolean;
}

const accessToken = getAccessToken();
const refreshToken = getRefreshToken();

const parseUserInformationFromToken = (token: string | null) => {
    if (!token) {
        return { userId: null, permissions: [], roles: [] }
    }

    try {
        const decodedToken = getDecodedToken(token);

        console.log({decodedToken})
        
        return { userId: decodedToken?.userId || null, permissions: decodedToken?.permissions || [], roles: decodedToken?.roles || [] }
    }
    catch {
        return { userId: null, permissions: [], roles: [] }
    }
}

const { userId, permissions, roles } = parseUserInformationFromToken(accessToken); 

const initialState: AuthState = {
    accessToken: accessToken || null,
    refreshToken: refreshToken || null,
    userId: userId || null,
    roles: roles || [],
    permissions: permissions || [],
    loading: false,
    isAuthenticated: !!accessToken
}

export const loginUser = createAsyncThunk("auth/login", async (body: LoginFormData) => {
    const { data } = await login(body);
    return data;
})

export const registerUser = createAsyncThunk("auth/register", async (body: RegisterFormData) => {
    await register(body);
    return true;
})

export const logoutUser = createAsyncThunk("auth/logout", async (body: LogoutData) => {
    await logoutUser(body);
    return true;
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            const { accessToken, refreshToken } = action.payload;

            if (accessToken && refreshToken) {
                state.accessToken = accessToken;
                state.refreshToken = refreshToken;
                
                setAccessToken(accessToken);
                setRefreshToken(refreshToken);

                const { userId, permissions, roles } = parseUserInformationFromToken(accessToken);

                state.userId = userId;
                state.permissions = permissions;
                state.roles = roles;
                state.loading = false;
                state.isAuthenticated = true;
            }
        })
        builder.addCase(loginUser.rejected, (state) => {
            state.loading = false;
        })
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.roles = [];
            state.permissions = [];
            state.isAuthenticated = false;
            clearTokens();
        })
    }
})

export default authSlice.reducer;