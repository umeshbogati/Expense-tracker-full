export interface SuccessParams<T> {
    data?: T;
    message?: string | null;
    meta?: unknown;
    status?: number;
}