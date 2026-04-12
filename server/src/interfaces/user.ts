import { RoleWithPermission } from "./role";

export interface UserRegisterRequest  {
    name: string;
    email: string;
    password: string;
}

export interface UserLoginRequest {
    email: string;
    password: string;
}

export interface AuthenticatedUser {
    userId: string;
    name: string;
    email: string;
    roles: string[];
    permissions: string[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface UserWithRolesAndPermission extends User {
    roles: RoleWithPermission[];
}