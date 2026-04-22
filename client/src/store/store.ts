import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import categoryReducer from "./slices/categorySlice";
import transactionReducer from "./slices/transactionSlice";
import permissionReducer from "./slices/permissionSlice";
import roleReducer from "./slices/roleSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        categories: categoryReducer,
        transactions: transactionReducer,
        permissions: permissionReducer,
        roles: roleReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch