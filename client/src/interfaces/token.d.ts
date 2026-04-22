import type { AuthenticatedUser } from "./user";
export interface Token {
    data: AuthenticatedUser;
    iat: number;
    exp: number;
}
