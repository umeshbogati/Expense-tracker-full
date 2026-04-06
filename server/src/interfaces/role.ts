export interface createRoleRequest {
    name: string;
    description: string;
    permissions?: string[]; // Array of permissions as strings
}