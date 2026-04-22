import http from "../utils/http";
export const getAll = async () => {
    return http.get("/roles");
};
export const create = async (data) => {
    return http.post("/roles", data);
};
export const update = async (id, data) => {
    return http.put(`/roles/${id}`, data);
};
export const remove = async (id) => {
    return http.delete(`/roles/${id}`);
};
