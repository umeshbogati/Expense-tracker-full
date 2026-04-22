import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { fetchPermissions, createPermission, updatePermission, deletePermission } from "../../store/slices/permissionSlice";
import { toast } from "react-toastify";
const empty = { name: "", description: "" };
const PermissionsPanel = () => {
    const dispatch = useAppDispatch();
    const { permissions, loading } = useAppSelector(state => state.permissions);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(empty);
    const [confirmId, setConfirmId] = useState(null);
    useEffect(() => { dispatch(fetchPermissions()); }, [dispatch]);
    const openCreate = () => { setEditing(null); setForm(empty); setOpen(true); };
    const openEdit = (p) => { setEditing(p); setForm({ name: p.name, description: p.description }); setOpen(true); };
    const handleClose = () => setOpen(false);
    const handleSave = async () => {
        try {
            if (editing) {
                await dispatch(updatePermission({ id: editing.id, data: form })).unwrap();
                toast.success("Permission updated");
            }
            else {
                await dispatch(createPermission(form)).unwrap();
                toast.success("Permission created");
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
            await dispatch(deletePermission(confirmId)).unwrap();
            toast.success("Permission deleted");
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : "Delete failed");
        }
        finally {
            setConfirmId(null);
        }
    };
    return (_jsxs(Box, { children: [_jsxs(Box, { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, children: [_jsx(Typography, { variant: "h6", children: "Permissions" }), _jsx(Button, { variant: "contained", size: "small", onClick: openCreate, children: "+ Add Permission" })] }), _jsx(TableContainer, { component: Paper, elevation: 1, children: _jsxs(Table, { size: "small", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Name" }), _jsx(TableCell, { children: "Description" }), _jsx(TableCell, { align: "right", children: "Actions" })] }) }), _jsx(TableBody, { children: loading ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 3, align: "center", children: "Loading\u2026" }) })) : permissions.map(p => (_jsxs(TableRow, { hover: true, children: [_jsx(TableCell, { children: p.name }), _jsx(TableCell, { children: p.description }), _jsxs(TableCell, { align: "right", children: [_jsx(Button, { size: "small", onClick: () => openEdit(p), children: "Edit" }), _jsx(IconButton, { size: "small", color: "error", onClick: () => setConfirmId(p.id), children: "\u2715" })] })] }, p.id))) })] }) }), _jsxs(Dialog, { open: open, onClose: handleClose, maxWidth: "xs", fullWidth: true, children: [_jsx(DialogTitle, { children: editing ? "Edit Permission" : "New Permission" }), _jsxs(DialogContent, { sx: { display: "flex", flexDirection: "column", gap: 2, pt: "16px !important" }, children: [_jsx(TextField, { label: "Name", value: form.name, onChange: e => setForm(f => ({ ...f, name: e.target.value })), fullWidth: true }), _jsx(TextField, { label: "Description", value: form.description, onChange: e => setForm(f => ({ ...f, description: e.target.value })), fullWidth: true })] }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleClose, children: "Cancel" }), _jsx(Button, { onClick: handleSave, variant: "contained", children: "Save" })] })] }), _jsxs(Dialog, { open: !!confirmId, onClose: () => setConfirmId(null), maxWidth: "xs", fullWidth: true, children: [_jsx(DialogTitle, { children: "Delete Permission?" }), _jsx(DialogContent, { children: _jsx(Typography, { children: "This action cannot be undone." }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: () => setConfirmId(null), children: "Cancel" }), _jsx(Button, { onClick: handleDelete, variant: "contained", color: "error", children: "Delete" })] })] })] }));
};
export default PermissionsPanel;
