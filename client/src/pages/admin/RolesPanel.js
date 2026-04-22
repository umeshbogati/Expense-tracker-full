import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Box, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { fetchRoles, createRole, updateRole, deleteRole } from "../../store/slices/roleSlice";
import { fetchPermissions } from "../../store/slices/permissionSlice";
import { toast } from "react-toastify";
const empty = { name: "", description: "", permissions: [] };
const RolesPanel = () => {
    const dispatch = useAppDispatch();
    const { roles, loading } = useAppSelector(state => state.roles);
    const { permissions } = useAppSelector(state => state.permissions);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(empty);
    const [confirmId, setConfirmId] = useState(null);
    useEffect(() => {
        dispatch(fetchRoles());
        dispatch(fetchPermissions());
    }, [dispatch]);
    const openCreate = () => { setEditing(null); setForm(empty); setOpen(true); };
    const openEdit = (r) => {
        setEditing(r);
        setForm({ name: r.name, description: r.description, permissions: r.permissions.map(p => p.name) });
        setOpen(true);
    };
    const togglePermission = (name) => {
        setForm(f => ({
            ...f,
            permissions: f.permissions.includes(name) ? f.permissions.filter(p => p !== name) : [...f.permissions, name],
        }));
    };
    const handleSave = async () => {
        try {
            if (editing) {
                await dispatch(updateRole({ id: editing.id, data: form })).unwrap();
                toast.success("Role updated");
            }
            else {
                await dispatch(createRole(form)).unwrap();
                toast.success("Role created");
            }
            setOpen(false);
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : "Operation failed");
        }
    };
    const handleDelete = async () => {
        if (!confirmId)
            return;
        try {
            await dispatch(deleteRole(confirmId)).unwrap();
            toast.success("Role deleted");
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : "Delete failed");
        }
        finally {
            setConfirmId(null);
        }
    };
    return (_jsxs(Box, { children: [_jsxs(Box, { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, children: [_jsx(Typography, { variant: "h6", children: "Roles" }), _jsx(Button, { variant: "contained", size: "small", onClick: openCreate, children: "+ Add Role" })] }), _jsx(TableContainer, { component: Paper, elevation: 1, children: _jsxs(Table, { size: "small", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Name" }), _jsx(TableCell, { children: "Description" }), _jsx(TableCell, { children: "Permissions" }), _jsx(TableCell, { align: "right", children: "Actions" })] }) }), _jsx(TableBody, { children: loading ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 4, align: "center", children: "Loading\u2026" }) })) : roles.map(r => (_jsxs(TableRow, { hover: true, children: [_jsx(TableCell, { children: r.name }), _jsx(TableCell, { children: r.description }), _jsx(TableCell, { children: _jsx(Box, { display: "flex", flexWrap: "wrap", gap: 0.5, children: r.permissions.map(p => _jsx(Chip, { label: p.name, size: "small" }, p.id)) }) }), _jsxs(TableCell, { align: "right", children: [_jsx(Button, { size: "small", onClick: () => openEdit(r), children: "Edit" }), _jsx(IconButton, { size: "small", color: "error", onClick: () => setConfirmId(r.id), children: "\u2715" })] })] }, r.id))) })] }) }), _jsxs(Dialog, { open: open, onClose: () => setOpen(false), maxWidth: "sm", fullWidth: true, children: [_jsx(DialogTitle, { children: editing ? "Edit Role" : "New Role" }), _jsxs(DialogContent, { sx: { display: "flex", flexDirection: "column", gap: 2, pt: "16px !important" }, children: [_jsx(TextField, { label: "Name", value: form.name, onChange: e => setForm(f => ({ ...f, name: e.target.value })), fullWidth: true }), _jsx(TextField, { label: "Description", value: form.description, onChange: e => setForm(f => ({ ...f, description: e.target.value })), fullWidth: true }), _jsx(Typography, { variant: "subtitle2", children: "Permissions" }), _jsx(FormGroup, { row: true, children: permissions.map(p => (_jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: form.permissions.includes(p.name), onChange: () => togglePermission(p.name), size: "small" }), label: _jsx(Typography, { variant: "body2", children: p.name }), sx: { width: "50%" } }, p.id))) })] }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: () => setOpen(false), children: "Cancel" }), _jsx(Button, { onClick: handleSave, variant: "contained", children: "Save" })] })] }), _jsxs(Dialog, { open: !!confirmId, onClose: () => setConfirmId(null), maxWidth: "xs", fullWidth: true, children: [_jsx(DialogTitle, { children: "Delete Role?" }), _jsx(DialogContent, { children: _jsx(Typography, { children: "This action cannot be undone." }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: () => setConfirmId(null), children: "Cancel" }), _jsx(Button, { onClick: handleDelete, variant: "contained", color: "error", children: "Delete" })] })] })] }));
};
export default RolesPanel;
