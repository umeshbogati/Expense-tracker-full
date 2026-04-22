export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    auth: import("./slices/authSlice").AuthState;
    users: import("./slices/userSlice").UserState;
    categories: import("./slices/categorySlice").CategoryState;
    transactions: import("./slices/transactionSlice").TransactionState;
    permissions: import("./slices/permissionSlice").PermissionState;
    roles: import("./slices/roleSlice").RoleState;
}, import("@reduxjs/toolkit").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("@reduxjs/toolkit").StoreEnhancer<{
    dispatch: import("@reduxjs/toolkit").ThunkDispatch<{
        auth: import("./slices/authSlice").AuthState;
        users: import("./slices/userSlice").UserState;
        categories: import("./slices/categorySlice").CategoryState;
        transactions: import("./slices/transactionSlice").TransactionState;
        permissions: import("./slices/permissionSlice").PermissionState;
        roles: import("./slices/roleSlice").RoleState;
    }, undefined, import("@reduxjs/toolkit").UnknownAction>;
}>, import("@reduxjs/toolkit").StoreEnhancer]>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
