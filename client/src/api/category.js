import http from "../utils/http";
export const getAll = async () => {
    return http.get("/categories");
};
export const create = async (data) => {
    return http.post("/categories", data);
};
export const update = async (id, data) => {
    return http.put(`/categories/${id}`, data);
};
export const remove = async (id) => {
    return http.delete(`/categories/${id}`);
};
