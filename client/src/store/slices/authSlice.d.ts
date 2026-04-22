import { type LogoutData } from "../../api/auth";
export interface AuthState {
    userId: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    roles: string[];
    permissions: string[];
    loading: boolean;
    isAuthenticated: boolean;
}
export declare const loginUser: import("@reduxjs/toolkit").AsyncThunk<any, {
    email: string;
    password: string;
}, import("@reduxjs/toolkit").AsyncThunkConfig>;
export declare const registerUser: import("@reduxjs/toolkit").AsyncThunk<boolean, {
    name: string;
    email: string;
    password: string;
}, import("@reduxjs/toolkit").AsyncThunkConfig>;
export declare const logoutUser: import("@reduxjs/toolkit").AsyncThunk<boolean, LogoutData, import("@reduxjs/toolkit").AsyncThunkConfig>;
export declare const authSlice: import("@reduxjs/toolkit").Slice<AuthState, {}, "auth", "auth", import("@reduxjs/toolkit").SliceSelectors<AuthState>>;
declare const _default: import("@reduxjs/toolkit").Reducer<AuthState>;
export default _default;
