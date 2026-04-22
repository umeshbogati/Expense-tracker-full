import { z } from "zod";
const loginSchema = z.object({
    email: z.email("Must be a valid email"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
});
export { loginSchema };
const passwordSchema = z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
const registerSchema = z.object({
    name: z.string().min(10, "Name must be at least 10 characters long"),
    email: z.string().email("Must be a valid email"),
    password: passwordSchema,
    // confirmPassword: z.string()
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });
export { registerSchema };
