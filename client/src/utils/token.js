import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/storage";
import * as storage from "./storage";
import { jwtDecode } from "jwt-decode";
export function getRefreshToken() {
    return storage.get(REFRESH_TOKEN);
}
export function getAccessToken() {
    return storage.get(ACCESS_TOKEN);
}
export function setAccessToken(token) {
    return storage.set(ACCESS_TOKEN, token);
}
export function setRefreshToken(token) {
    return storage.set(REFRESH_TOKEN, token);
}
export function clearTokens() {
    storage.remove(REFRESH_TOKEN);
    storage.remove(ACCESS_TOKEN);
}
export function getDecodedToken(token) {
    try {
        return jwtDecode(token);
    }
    catch (error) {
        console.log("Error decoding token:", error);
        return null;
    }
}
