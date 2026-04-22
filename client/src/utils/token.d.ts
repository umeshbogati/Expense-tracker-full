export declare function getRefreshToken(): string;
export declare function getAccessToken(): string;
export declare function setAccessToken(token: string): void;
export declare function setRefreshToken(token: string): void;
export declare function clearTokens(): void;
interface Token {
    userId: string;
    email: string;
    roles: string[];
    permissions: string[];
    iat: number;
    exp: number;
}
export declare function getDecodedToken(token: string): Token | null;
export {};
