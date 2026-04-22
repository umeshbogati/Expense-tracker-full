import type { SuccessParams } from "../interfaces/response";
import type { UserWithRolesAndPermission } from "../interfaces/user";
export declare const getMe: () => Promise<SuccessParams<UserWithRolesAndPermission>>;
export declare const getAll: () => Promise<SuccessParams<UserWithRolesAndPermission[]>>;
export declare const getById: (id: string) => Promise<SuccessParams<UserWithRolesAndPermission>>;
