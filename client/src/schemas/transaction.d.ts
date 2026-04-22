import { z } from "zod";
export declare const createTransactionSchema: z.ZodObject<{
    amount: z.ZodCoercedNumber<unknown>;
    description: z.ZodString;
    date: z.ZodString;
    type: z.ZodEnum<{
        Income: "Income";
        Expense: "Expense";
    }>;
    category: z.ZodString;
    file: z.ZodOptional<z.ZodCustom<File, File>>;
}, z.core.$strip>;
export type CreateTransactionFormData = z.infer<typeof createTransactionSchema>;
