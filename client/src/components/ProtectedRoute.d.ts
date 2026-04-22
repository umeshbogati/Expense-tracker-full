import type { ReactNode } from "react";
interface ProtectedRouteProps {
    children: ReactNode;
    requiredPermissions: string[];
}
declare const ProtectedRoute: ({ children, requiredPermissions }: ProtectedRouteProps) => import("react/jsx-runtime").JSX.Element;
export default ProtectedRoute;
