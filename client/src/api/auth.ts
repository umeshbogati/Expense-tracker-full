import type { LoginFormData } from "../pages/Login";
import type { RegisterFormData } from "../pages/Register";
import http from "../utils/http";

export const login = async (body: LoginFormData) => {
    return http.post("/auth/login", body);
}

export const register = async (body: RegisterFormData) => {
    return http.post("/auth/register", body);
}

export interface LogoutData {
    refreshToken: string;
}

export const logout = async (body: LogoutData) => {
    return http.post("/auth/logout", body);
}