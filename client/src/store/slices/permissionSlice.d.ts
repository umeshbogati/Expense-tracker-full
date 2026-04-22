import type { Permission } from "../../interfaces/permission";
export interface PermissionState {
    permissions: Permission[];
    loading: boolean;
}
export declare const fetchPermissions: import("@reduxjs/toolkit").AsyncThunk<Permission[], void, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("@reduxjs/toolkit").ThunkDispatch<unknown, unknown, import("@reduxjs/toolkit").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const createPermission: import("@reduxjs/toolkit").AsyncThunk<Permission, {
    name: string;
    description: string;
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
export declare const updatePermission: import("@reduxjs/toolkit").AsyncThunk<Permission, {
    id: string;
    data: Partial<{
        name: string;
        description: string;
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
export declare const deletePermission: import("@reduxjs/toolkit").AsyncThunk<string, string, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("@reduxjs/toolkit").ThunkDispatch<unknown, unknown, import("@reduxjs/toolkit").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare const _default: import("@reduxjs/toolkit").Reducer<PermissionState>;
export default _default;
