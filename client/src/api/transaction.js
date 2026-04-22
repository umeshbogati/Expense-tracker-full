import http from "../utils/http";
export const create = async (formData) => {
    return http.post("/transactions", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};
export const getAll = async () => {
    return http.get("/transactions");
};
export const getByUserId = async (userId, params) => {
    // console.log("Fetching transactions for userId:", userId, "with params:", params);
    return http.get(`/transactions/user/${userId}`, { params });
};
export const getById = async (id) => {
    return http.get(`/transactions/${id}`);
};
export const update = async (id, formData) => {
    return http.put(`/transactions/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};
export const remove = async (id) => {
    return http.delete(`/transactions/${id}`);
};
