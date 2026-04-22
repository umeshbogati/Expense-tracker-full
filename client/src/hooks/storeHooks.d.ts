export declare const useAppDispatch: import("react-redux").UseDispatch<import("@reduxjs/toolkit").ThunkDispatch<{
    auth: import("../store/slices/authSlice").AuthState;
    users: import("../store/slices/userSlice").UserState;
    categories: import("../store/slices/categorySlice").CategoryState;
    transactions: import("../store/slices/transactionSlice").TransactionState;
    permissions: import("../store/slices/permissionSlice").PermissionState;
    roles: import("../store/slices/roleSlice").RoleState;
}, undefined, import("@reduxjs/toolkit").UnknownAction> & import("@reduxjs/toolkit").Dispatch<import("@reduxjs/toolkit").UnknownAction>>;
export declare const useAppSelector: import("react-redux").UseSelector<{
    auth: import("../store/slices/authSlice").AuthState;
    users: import("../store/slices/userSlice").UserState;
    categories: import("../store/slices/categorySlice").CategoryState;
    transactions: import("../store/slices/transactionSlice").TransactionState;
    permissions: import("../store/slices/permissionSlice").PermissionState;
    roles: import("../store/slices/roleSlice").RoleState;
}>;
