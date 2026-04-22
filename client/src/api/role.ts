import http from "../utils/http";
import type { RoleWithPermission } from "../interfaces/role";
import type { SuccessParams } from "../interfaces/response";

export const getAll = async (): Promise<SuccessParams<RoleWithPermission[]>> => {
    return http.get("/roles");
};

export const create = async (data: { name: string; description: string; permissions?: string[] }): Promise<SuccessParams<RoleWithPermission>> => {
    return http.post("/roles", data);
};

export const update = async (id: string, data: Partial<{ name: string; description: string; permissions: string[] }>): Promise<SuccessParams<RoleWithPermission>> => {
    return http.put(`/roles/${id}`, data);
};

export const remove = async (id: string): Promise<void> => {
    return http.delete(`/roles/${id}`);
};