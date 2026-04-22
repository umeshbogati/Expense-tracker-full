import type { LoginFormData } from "../pages/Login";
import type { RegisterFormData } from "../pages/Register";
export declare const login: (body: LoginFormData) => Promise<import("axios").AxiosResponse<any, any, {}>>;
export declare const register: (body: RegisterFormData) => Promise<import("axios").AxiosResponse<any, any, {}>>;
export interface LogoutData {
    refreshToken: string;
}
export declare const logout: (body: LogoutData) => Promise<import("axios").AxiosResponse<any, any, {}>>;
