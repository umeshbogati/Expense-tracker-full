import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { useEffect } from "react";
import { fetchUsers } from "../store/slices/userSlice";
import { useNavigate } from "react-router";
const AllUsers = () => {
    const dispatch = useAppDispatch();
    const { users, loadingAll } = useAppSelector(state => state.users);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    if (loadingAll) {
        return _jsx(CircularProgress, {});
    }
    if (!users) {
        return _jsx("h1", { children: "No users found" });
    }
    return (_jsx(Box, { margin: "40px auto", padding: 4, borderRadius: 2, children: _jsx(TableContainer, { component: Paper, children: _jsxs(Table, { sx: { minWidth: 650 }, "aria-label": "Table showing all user data", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "ID" }), _jsx(TableCell, { align: "right", children: "Name" }), _jsx(TableCell, { align: "right", children: "Email" }), _jsx(TableCell, { align: "right", children: "Roles" }), _jsx(TableCell, { align: "right", children: "Permissions" })] }) }), _jsx(TableBody, { children: Object.values(users).map((user) => (_jsxs(TableRow, { children: [_jsx(TableCell, { component: "th", scope: "row", onClick: () => navigate(`/users/${user.id}`), children: user.id }), _jsx(TableCell, { align: "right", children: user.name }), _jsx(TableCell, { align: "right", children: user.email }), _jsx(TableCell, { align: "right", children: user.roles.map(role => role.name).join(", ") }), _jsx(TableCell, { align: "right", children: user.roles.flatMap(role => role.permissions).map(permission => permission.name).join(", ") })] }, user.id))) })] }) }) }));
};
export default AllUsers;
