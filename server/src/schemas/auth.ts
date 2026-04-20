import { z } from "zod";

export const createUser = z.object({
    name: z.string().min(10),
    email: z.email(),
    password: z.string().min(10)
})

export const login = z.object({
    email: z.email(),
    password: z.string(),
})

export const logout = z.object({
    refreshToken: z.string()
})