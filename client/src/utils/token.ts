import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/storage";
import * as storage from "./storage";
import { jwtDecode } from "jwt-decode";

export function getRefreshToken(): string {
    return storage.get(REFRESH_TOKEN);
}

export function getAccessToken(): string {
    return storage.get(ACCESS_TOKEN);
}

export function setAccessToken(token: string) {
    return storage.set(ACCESS_TOKEN, token);
}

export function setRefreshToken(token: string) {
    return storage.set(REFRESH_TOKEN, token);
}

export function clearTokens () {
    storage.remove(REFRESH_TOKEN);
    storage.remove(ACCESS_TOKEN);
}

interface Token {
    userId: string;
    email: string;
    roles: string[];
    permissions: string[];
    iat: number;
    exp: number;
}

export function getDecodedToken(token: string): Token | null {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.log("Error decoding token:", error);
    return null;
  }
}