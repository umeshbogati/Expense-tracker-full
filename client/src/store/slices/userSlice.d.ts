import type { UserWithRolesAndPermission } from "../../interfaces/user";
export interface UserState {
    users: Record<string, UserWithRolesAndPermission>;
    loadingById: Record<string, boolean>;
    loadingAll: boolean;
    errorById: Record<string, string | null>;
    errorAll: string | null;
}
export declare const fetchUsers: import("@reduxjs/toolkit").AsyncThunk<UserWithRolesAndPermission[], void, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("@reduxjs/toolkit").ThunkDispatch<unknown, unknown, import("@reduxjs/toolkit").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const fetchUserById: import("@reduxjs/toolkit").AsyncThunk<UserWithRolesAndPermission | undefined, string, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("@reduxjs/toolkit").ThunkDispatch<unknown, unknown, import("@reduxjs/toolkit").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const fetchMe: import("@reduxjs/toolkit").AsyncThunk<UserWithRolesAndPermission | undefined, string, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("@reduxjs/toolkit").ThunkDispatch<unknown, unknown, import("@reduxjs/toolkit").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const userSlice: import("@reduxjs/toolkit").Slice<UserState, {}, "users", "users", import("@reduxjs/toolkit").SliceSelectors<UserState>>;
declare const _default: import("@reduxjs/toolkit").Reducer<UserState>;
export default _default;
