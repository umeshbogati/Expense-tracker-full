import type { SuccessParams } from "../interfaces/response";
import type { UserWithRolesAndPermission } from "../interfaces/user";
import http from "../utils/http"

//Get the current logged in user

export const getMe = async (): Promise<SuccessParams<UserWithRolesAndPermission>> => {
    return http.get("/users/me");
}

//Get all users
export const getAll = async (): Promise<SuccessParams<UserWithRolesAndPermission[]>> => {
    return http.get("/users");
};

//Get user  by Id
export const getById = async (id: string): Promise<SuccessParams<UserWithRolesAndPermission>> => {
    return http.get(`/users/${id}`);
};
