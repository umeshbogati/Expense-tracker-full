import { z } from "zod";

export const createCategory = z.object({
    name: z.string().min(3),
    description: z.string().min(3),
    type: z.enum(["Income", "Expense"])
})