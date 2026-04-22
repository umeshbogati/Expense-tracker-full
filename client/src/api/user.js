import http from "../utils/http";
//Get the current logged in user
export const getMe = async () => {
    return http.get("/users/me");
};
//Get all users
export const getAll = async () => {
    return http.get("/users");
};
//Get user  by Id
export const getById = async (id) => {
    return http.get(`/users/${id}`);
};
