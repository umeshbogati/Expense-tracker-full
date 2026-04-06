import { z } from "zod";

export const createRole = z.object({
    name: z.string().min(5),
    description: z.string().min(10),
    permissions: z.array(z.string()).optional(),
})