import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks/storeHooks";
import appRoles from "../../constants/appRoles";
import PermissionsPanel from "./PermissionsPanel";
import RolesPanel from "./RolesPanel";
import CategoriesPanel from "./CategoriesPanel";
const TABS = ["Permissions", "Roles", "Categories"];
const AdminPage = () => {
    const navigate = useNavigate();
    const { roles } = useAppSelector(state => state.auth);
    const [tab, setTab] = useState(0);
    const isSuperAdmin = roles.includes(appRoles.SUPER_ADMIN.name);
    if (!isSuperAdmin) {
        navigate("/");
        return null;
    }
    return (_jsxs(Container, { maxWidth: "lg", sx: { py: 4 }, children: [_jsx(Typography, { variant: "h5", fontWeight: 600, mb: 3, children: "Admin Actions" }), _jsx(Box, { sx: { borderBottom: 1, borderColor: "divider", mb: 3 }, children: _jsx(Tabs, { value: tab, onChange: (_, v) => setTab(v), children: TABS.map(t => _jsx(Tab, { label: t }, t)) }) }), tab === 0 && _jsx(PermissionsPanel, {}), tab === 1 && _jsx(RolesPanel, {}), tab === 2 && _jsx(CategoriesPanel, {})] }));
};
export default AdminPage;
