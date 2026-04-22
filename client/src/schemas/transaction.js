import { z } from "zod";
export const createTransactionSchema = z.object({
    amount: z.coerce.number().min(1, "Amount must be at least 1"),
    description: z.string().min(3, "Min 3 characters"),
    date: z.string().min(10, "Date is required"),
    type: z.enum(["Income", "Expense"]),
    category: z.string().min(1, "Category is required"),
    file: z.instanceof(File).optional(),
});
