import { Permission } from "./permission";

export interface CreateRoleWithPermissionRequest {
  name: string;
  description: string;
  permissions?: string[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
}

export interface RoleWithPermission extends Role {
  permissions: Permission[];
}