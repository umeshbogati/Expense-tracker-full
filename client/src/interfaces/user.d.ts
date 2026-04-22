import type { RoleWithPermission } from "./role";
export interface AuthenticatedUser {
    id: string;
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
