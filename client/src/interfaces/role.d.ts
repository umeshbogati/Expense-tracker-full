import type { Permission } from "./permission";
export interface Role {
    id: string;
    name: string;
    description: string;
}
export interface RoleWithPermission extends Role {
    permissions: Permission[];
}
