import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { useEffect } from "react";
import { fetchUserById } from "../store/slices/userSlice";
import { Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
const UserPage = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { users, loadingById } = useAppSelector(state => state.users);
    const user = id ? users[id] : undefined;
    const isLoading = id ? loadingById[id] : false;
    // Assignment: If we already have user information, we do not need to dispatch
    useEffect(() => {
        if (id && !user) {
            dispatch(fetchUserById(id));
        }
    }, [id, user, dispatch]);
    if (isLoading) {
        return _jsx(CircularProgress, {});
    }
    if (!user) {
        return _jsx("h1", { children: "User not found" });
    }
    return (_jsx(Box, { margin: "40px auto", padding: 4, borderRadius: 2, children: _jsx(TableContainer, { component: Paper, children: _jsxs(Table, { sx: { minWidth: 650 }, "aria-label": "Table showing all user data", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "ID" }), _jsx(TableCell, { align: "right", children: "Name" }), _jsx(TableCell, { align: "right", children: "Email" }), _jsx(TableCell, { align: "right", children: "Roles" }), _jsx(TableCell, { align: "right", children: "Permissions" })] }) }), _jsx(TableBody, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { component: "th", scope: "row", children: user.id }), _jsx(TableCell, { align: "right", children: user.name }), _jsx(TableCell, { align: "right", children: user.email }), _jsx(TableCell, { align: "right", children: user.roles.map(role => role.name).join(", ") }), _jsx(TableCell, { align: "right", children: user.roles.flatMap(role => role.permissions).map(permission => permission.name).join(", ") })] }, user.id) })] }) }) }));
};
export default UserPage;
