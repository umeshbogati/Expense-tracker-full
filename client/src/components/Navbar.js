import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { AppBar, Avatar, Box, Button, Divider, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { logoutUser } from "../store/slices/authSlice";
import appPermissions from "../constants/appPermissions";
import appRoles from "../constants/appRoles";
const ADMIN_PERMISSIONS = [
    appPermissions.CREATE_ROLES.name,
    appPermissions.VIEW_ROLES.name,
    appPermissions.CREATE_PERMISSIONS.name,
    appPermissions.VIEW_PERMISSIONS.name,
    appPermissions.CREATE_CATEGORIES.name,
    appPermissions.UPDATE_CATEGORIES.name,
    appPermissions.DELETE_CATEGORIES.name,
    appPermissions.MANAGE_USERS.name,
];
const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuthenticated, refreshToken, permissions, roles, userId } = useAppSelector(state => state.auth);
    const user = useAppSelector(state => userId ? state.users.users[userId] : undefined);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const isSuperAdmin = roles.includes(appRoles.SUPER_ADMIN.name);
    const isAdmin = isSuperAdmin || ADMIN_PERMISSIONS.some(p => permissions.includes(p));
    const handleLogout = () => {
        setAnchorEl(null);
        if (refreshToken)
            dispatch(logoutUser({ refreshToken }));
        navigate("/");
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const displayName = user?.name ?? "Account";
    const initials = displayName.slice(0, 2).toUpperCase();
    return (_jsx(AppBar, { position: "static", children: _jsxs(Toolbar, { children: [_jsx(Typography, { variant: "h6", sx: { cursor: "pointer", mr: 3 }, onClick: () => navigate("/"), children: "Expense Tracker" }), isAuthenticated && (_jsx(Button, { color: "inherit", onClick: () => navigate("/transactions"), children: "Transactions" })), _jsx(Box, { sx: { flexGrow: 1 } }), !isAuthenticated ? (_jsxs(Box, { children: [_jsx(Button, { color: "inherit", onClick: () => navigate("/register"), children: "Register" }), _jsx(Button, { color: "inherit", onClick: () => navigate("/login"), children: "Login" })] })) : (_jsxs(Box, { display: "flex", alignItems: "center", gap: 1, children: [isAdmin && (_jsx(Button, { color: "inherit", onClick: () => navigate("/admin"), children: "Admin Actions" })), _jsx(Avatar, { sx: { width: 34, height: 34, cursor: "pointer", bgcolor: "secondary.main", fontSize: 13 }, onClick: (e) => setAnchorEl(e.currentTarget), children: initials }), _jsxs(Menu, { anchorEl: anchorEl, open: open, onClose: () => setAnchorEl(null), children: [_jsx(MenuItem, { disabled: true, sx: { opacity: 1 }, children: _jsx(Typography, { variant: "body2", fontWeight: 600, children: displayName }) }), _jsx(Divider, {}), _jsx(MenuItem, { onClick: () => { setAnchorEl(null); navigate("/profile"); }, children: "View Profile" }), _jsx(MenuItem, { onClick: handleLogout, sx: { color: "error.main" }, children: "Logout" })] })] }))] }) }));
};
export default Navbar;
