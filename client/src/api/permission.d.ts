import type { Permission } from "../interfaces/permission";
import type { SuccessParams } from "../interfaces/response";
export declare const getAll: () => Promise<SuccessParams<Permission[]>>;
export declare const create: (data: {
    name: string;
    description: string;
}) => Promise<SuccessParams<Permission>>;
export declare const update: (id: string, data: Partial<{
    name: string;
    description: string;
}>) => Promise<SuccessParams<Permission>>;
export declare const remove: (id: string) => Promise<void>;
