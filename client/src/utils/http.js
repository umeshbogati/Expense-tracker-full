import axios, { HttpStatusCode } from "axios";
import { config } from "../config";
import { clearTokens, getAccessToken, getRefreshToken, setAccessToken } from "./token";
import { buildUrl } from "./string";
// import { buildUrl } from "./string";
const http = axios.create({
    baseURL: config.apiBaseURI,
    headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
    }
});
http.interceptors.request.use((config) => {
    if (config.headers) {
        // Assignment: Get access token from the store (Hint: Do not use dispatch)
        config.headers.Authorization = `Bearer ${getAccessToken()}`;
    }
    return config;
});
http.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    return unauthorizedResponseHandleInterceptor(error);
});
const REFRESH_TOKEN_URL = buildUrl(config.apiBaseURI, config.endpoints.authRefreshToken);
let isRefreshingAccessToken = false;
let unauthorizedRequestQueue = []; // Queue to hold pending requests while access token is being refreshed
/**
 * Changes access token of the provided request.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function changeAccessToken(originalRequest, newToken) {
    return {
        ...originalRequest,
        headers: {
            ...originalRequest.headers,
            Authorization: `Bearer ${newToken}`
        }
    };
}
/**
 * Calls pending requests from unauthorized request queue.
 *
 * @param {String} refreshedAccessToken
 */
function callRequestsFromUnauthorizedQueue(refreshedAccessToken) {
    unauthorizedRequestQueue.map((cb) => cb(refreshedAccessToken));
}
/**
 * Clears unauthorized request queue.
 */
function clearUnauthorizedRequestQueue() {
    unauthorizedRequestQueue = [];
}
/**
 * Subscribe retry request to access token refresh.
 * Add request to unauthorized request queue.
 *
 * @param {Function} callback
 */
function subscribeToAccessTokenRefresh(callback) {
    unauthorizedRequestQueue.push(callback);
}
const refreshAccessToken = async () => {
    console.log("Refreshing access token");
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        throw new Error("No refresh token found");
    }
    const response = await axios.post(REFRESH_TOKEN_URL, { refreshToken });
    // const accessToken = response.data?.accessToken ?? response.data?.data?.accessToken;
    const accessToken = response.data?.data?.accessToken;
    console.log(accessToken, "Access token");
    if (!accessToken) {
        throw new Error("Invalid access token");
    }
    return { accessToken };
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const unauthorizedResponseHandleInterceptor = async (error) => {
    console.log('Unauthorized response handle interceptor called');
    const originalRequest = error.config;
    if (!originalRequest) {
        return Promise.reject(error);
    }
    const errorCode = error.response && error.response.status;
    // If the error code is not unauthorized, reject the error
    if (errorCode !== HttpStatusCode.Unauthorized) {
        return Promise.reject(error);
    }
    console.log("Original request url", originalRequest.url);
    if (originalRequest.url === REFRESH_TOKEN_URL) {
        console.log("Inside original request url");
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(error);
    }
    try {
        console.log("Inside try block");
        if (isRefreshingAccessToken) {
            console.log("Inside isRefreshingAccessToken");
            const retryRequest = new Promise((resolve) => {
                subscribeToAccessTokenRefresh((refreshedAccessToken) => {
                    const newRequest = changeAccessToken(originalRequest, refreshedAccessToken);
                    resolve(http.request(newRequest));
                });
            });
            return await retryRequest;
        }
        console.log("Inside else block");
        // Generate refresh token
        isRefreshingAccessToken = true;
        const { accessToken } = await refreshAccessToken();
        setAccessToken(accessToken);
        // Call pending requests from unauthorized request queue with the new access toekn
        callRequestsFromUnauthorizedQueue(accessToken);
        // Clear unauthorized queue
        clearUnauthorizedRequestQueue();
        const newRequest = changeAccessToken(originalRequest, accessToken);
        isRefreshingAccessToken = false;
        return await http.request(newRequest);
    }
    catch (error) {
        clearTokens();
        window.location.href = "/login";
        console.log("Error refreshing access token", error);
        return Promise.reject(error);
    }
};
export default http;
