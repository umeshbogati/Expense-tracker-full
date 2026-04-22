import { registerSchema } from '../schemas/auth';
import { z } from "zod";
export type RegisterFormData = z.infer<typeof registerSchema>;
declare const Register: () => import("react/jsx-runtime").JSX.Element;
export default Register;
