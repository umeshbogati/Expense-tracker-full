import { z } from "zod";

export const createPermission = z.object({
    name: z.string().min(5),
    description: z.string().min(10)
})