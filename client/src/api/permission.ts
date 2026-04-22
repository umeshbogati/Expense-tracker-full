import http from "../utils/http";
import type { Permission } from "../interfaces/permission";
import type { SuccessParams } from "../interfaces/response";

export const getAll = async (): Promise<SuccessParams<Permission[]>> => {
    return http.get("/permissions");
};

export const create = async (data: { name: string; description: string }): Promise<SuccessParams<Permission>> => {
    return http.post("/permissions", data);
};

export const update = async (id: string, data: Partial<{ name: string; description: string }>): Promise<SuccessParams<Permission>> => {
    return http.put(`/permissions/${id}`, data);
};

export const remove = async (id: string): Promise<void> => {
    return http.delete(`/permissions/${id}`);
};