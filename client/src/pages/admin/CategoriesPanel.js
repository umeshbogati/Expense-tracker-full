import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { fetchCategories, createCategory, updateCategory, deleteCategory } from "../../store/slices/categorySlice";
import { toast } from "react-toastify";
const empty = { name: "", description: "", type: "Expense" };
const CategoriesPanel = () => {
    const dispatch = useAppDispatch();
    const { categories, loading } = useAppSelector(state => state.categories);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(empty);
    const [confirmId, setConfirmId] = useState(null);
    useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);
    const openCreate = () => { setEditing(null); setForm(empty); setOpen(true); };
    const openEdit = (c) => { setEditing(c); setForm({ name: c.name, description: c.description, type: c.type }); setOpen(true); };
    const handleSave = async () => {
        try {
            if (editing) {
                await dispatch(updateCategory({ id: editing.id, data: form })).unwrap();
                toast.success("Category updated");
            }
            else {
                await dispatch(createCategory(form)).unwrap();
                toast.success("Category created");
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
            await dispatch(deleteCategory(confirmId)).unwrap();
            toast.success("Category deleted");
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : "Delete failed");
        }
        finally {
            setConfirmId(null);
        }
    };
    return (_jsxs(Box, { children: [_jsxs(Box, { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, children: [_jsx(Typography, { variant: "h6", children: "Categories" }), _jsx(Button, { variant: "contained", size: "small", onClick: openCreate, children: "+ Add Category" })] }), _jsx(TableContainer, { component: Paper, elevation: 1, children: _jsxs(Table, { size: "small", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Name" }), _jsx(TableCell, { children: "Description" }), _jsx(TableCell, { children: "Type" }), _jsx(TableCell, { align: "right", children: "Actions" })] }) }), _jsx(TableBody, { children: loading ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 4, align: "center", children: "Loading\u2026" }) })) : categories.map(c => (_jsxs(TableRow, { hover: true, children: [_jsx(TableCell, { children: c.name }), _jsx(TableCell, { children: c.description }), _jsx(TableCell, { children: _jsx(Chip, { label: c.type, size: "small", color: c.type === "Income" ? "success" : "error" }) }), _jsxs(TableCell, { align: "right", children: [_jsx(Button, { size: "small", onClick: () => openEdit(c), children: "Edit" }), _jsx(IconButton, { size: "small", color: "error", onClick: () => setConfirmId(c.id), children: "\u2715" })] })] }, c.id))) })] }) }), _jsxs(Dialog, { open: open, onClose: () => setOpen(false), maxWidth: "xs", fullWidth: true, children: [_jsx(DialogTitle, { children: editing ? "Edit Category" : "New Category" }), _jsxs(DialogContent, { sx: { display: "flex", flexDirection: "column", gap: 2, pt: "16px !important" }, children: [_jsx(TextField, { label: "Name", value: form.name, onChange: e => setForm(f => ({ ...f, name: e.target.value })), fullWidth: true }), _jsx(TextField, { label: "Description", value: form.description, onChange: e => setForm(f => ({ ...f, description: e.target.value })), fullWidth: true }), _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Type" }), _jsxs(Select, { label: "Type", value: form.type, onChange: e => setForm(f => ({ ...f, type: e.target.value })), children: [_jsx(MenuItem, { value: "Income", children: "Income" }), _jsx(MenuItem, { value: "Expense", children: "Expense" })] })] })] }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: () => setOpen(false), children: "Cancel" }), _jsx(Button, { onClick: handleSave, variant: "contained", children: "Save" })] })] }), _jsxs(Dialog, { open: !!confirmId, onClose: () => setConfirmId(null), maxWidth: "xs", fullWidth: true, children: [_jsx(DialogTitle, { children: "Delete Category?" }), _jsx(DialogContent, { children: _jsx(Typography, { children: "This action cannot be undone." }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: () => setConfirmId(null), children: "Cancel" }), _jsx(Button, { onClick: handleDelete, variant: "contained", color: "error", children: "Delete" })] })] })] }));
};
export default CategoriesPanel;
