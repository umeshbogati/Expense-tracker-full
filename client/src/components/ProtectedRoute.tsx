import type { ReactNode } from "react";
import { useAppSelector } from "../hooks/storeHooks";
import appRoles from "../constants/appRoles";

interface ProtectedRouteProps {
    children: ReactNode;
    requiredPermissions: string[];
}

const ProtectedRoute = ({ children, requiredPermissions } : ProtectedRouteProps) => {
    const { roles, permissions: currentPermissions} = useAppSelector(state=> state.auth);

    const isSuperAdmin = roles.includes(appRoles.SUPER_ADMIN.name);

    // Check against the current user permissions
    const doesHavePermission = currentPermissions && requiredPermissions.some((permission) => currentPermissions.includes(permission));

    const isAuthorized = isSuperAdmin || doesHavePermission;

    // If user is not authorized, maybe navigate or maybe show some kind of error
    if (!isAuthorized) {
        // return <Navigate to="/" replace />
        return <h1>You do not have sufficient permission to access this resource</h1>
    }

    return <>{children}</>
}

export default ProtectedRoute;