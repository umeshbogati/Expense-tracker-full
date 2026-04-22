import http from "../utils/http";
export const getAll = async () => {
    return http.get("/permissions");
};
export const create = async (data) => {
    return http.post("/permissions", data);
};
export const update = async (id, data) => {
    return http.put(`/permissions/${id}`, data);
};
export const remove = async (id) => {
    return http.delete(`/permissions/${id}`);
};
