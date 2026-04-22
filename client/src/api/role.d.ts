import type { RoleWithPermission } from "../interfaces/role";
import type { SuccessParams } from "../interfaces/response";
export declare const getAll: () => Promise<SuccessParams<RoleWithPermission[]>>;
export declare const create: (data: {
    name: string;
    description: string;
    permissions?: string[];
}) => Promise<SuccessParams<RoleWithPermission>>;
export declare const update: (id: string, data: Partial<{
    name: string;
    description: string;
    permissions: string[];
}>) => Promise<SuccessParams<RoleWithPermission>>;
export declare const remove: (id: string) => Promise<void>;
