import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useAppSelector } from "../hooks/storeHooks";
import appRoles from "../constants/appRoles";
const ProtectedRoute = ({ children, requiredPermissions }) => {
    const { roles, permissions: currentPermissions } = useAppSelector(state => state.auth);
    const isSuperAdmin = roles.includes(appRoles.SUPER_ADMIN.name);
    // Check against the current user permissions
    const doesHavePermission = currentPermissions && requiredPermissions.some((permission) => currentPermissions.includes(permission));
    const isAuthorized = isSuperAdmin || doesHavePermission;
    // If user is not authorized, maybe navigate or maybe show some kind of error
    if (!isAuthorized) {
        // return <Navigate to="/" replace />
        return _jsx("h1", { children: "You do not have sufficient permission to access this resource" });
    }
    return _jsx(_Fragment, { children: children });
};
export default ProtectedRoute;
