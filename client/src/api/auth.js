import http from "../utils/http";
export const login = async (body) => {
    return http.post("/auth/login", body);
};
export const register = async (body) => {
    return http.post("/auth/register", body);
};
export const logout = async (body) => {
    return http.post("/auth/logout", body);
};
