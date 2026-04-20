import { z } from "zod";

export const createTransaction = z.object({
    amount: z.coerce.number().min(1),
    description: z.string().min(3),
    date: z.string().min(10),
    type: z.enum(["Income", "Expense"]),
    category: z.string(),
    file: z.file().optional()
})