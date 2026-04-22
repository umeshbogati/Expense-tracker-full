import { loginSchema } from '../schemas/auth';
import { z } from "zod";
export type LoginFormData = z.infer<typeof loginSchema>;
declare const Login: () => import("react/jsx-runtime").JSX.Element;
export default Login;
