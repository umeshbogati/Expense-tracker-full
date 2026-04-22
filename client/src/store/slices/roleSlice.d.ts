import type { RoleWithPermission } from "../../interfaces/role";
export interface RoleState {
    roles: RoleWithPermission[];
    loading: boolean;
}
export declare const fetchRoles: import("@reduxjs/toolkit").AsyncThunk<RoleWithPermission[], void, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("@reduxjs/toolkit").ThunkDispatch<unknown, unknown, import("@reduxjs/toolkit").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const createRole: import("@reduxjs/toolkit").AsyncThunk<RoleWithPermission, {
    name: string;
    description: string;
    permissions?: string[];
}, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("@reduxjs/toolkit").ThunkDispatch<unknown, unknown, import("@reduxjs/toolkit").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const updateRole: import("@reduxjs/toolkit").AsyncThunk<RoleWithPermission, {
    id: string;
    data: Partial<{
        name: string;
        description: string;
        permissions: string[];
    }>;
}, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("@reduxjs/toolkit").ThunkDispatch<unknown, unknown, import("@reduxjs/toolkit").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const deleteRole: import("@reduxjs/toolkit").AsyncThunk<string, string, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("@reduxjs/toolkit").ThunkDispatch<unknown, unknown, import("@reduxjs/toolkit").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare const _default: import("@reduxjs/toolkit").Reducer<RoleState>;
export default _default;
