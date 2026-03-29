import { NotFound } from "../interfaces/error";

export const NotFoundError = (message?: string): NotFound => {
    return {
        message: message || "Item not found",
        status: 404
    }
}