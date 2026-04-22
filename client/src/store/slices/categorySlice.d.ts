import type { Category } from "../../interfaces/category";
export interface CategoryState {
    categories: Category[];
    loading: boolean;
}
export declare const fetchCategories: import("@reduxjs/toolkit").AsyncThunk<Category[], void, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("@reduxjs/toolkit").ThunkDispatch<unknown, unknown, import("@reduxjs/toolkit").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const createCategory: import("@reduxjs/toolkit").AsyncThunk<Category, {
    name: string;
    description: string;
    type: "Income" | "Expense";
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
export declare const updateCategory: import("@reduxjs/toolkit").AsyncThunk<Category, {
    id: string;
    data: Partial<{
        name: string;
        description: string;
        type: "Income" | "Expense";
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
export declare const deleteCategory: import("@reduxjs/toolkit").AsyncThunk<string, string, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("@reduxjs/toolkit").ThunkDispatch<unknown, unknown, import("@reduxjs/toolkit").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const categorySlice: import("@reduxjs/toolkit").Slice<CategoryState, {}, "categories", "categories", import("@reduxjs/toolkit").SliceSelectors<CategoryState>>;
declare const _default: import("@reduxjs/toolkit").Reducer<CategoryState>;
export default _default;
