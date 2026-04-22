import { useEffect, useState } from "react";
import {
    Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, TextField, Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { fetchCategories, createCategory, updateCategory, deleteCategory } from "../../store/slices/categorySlice";
import type { Category } from "../../interfaces/category";
import { toast } from "react-toastify";

interface FormState { name: string; description: string; type: "Income" | "Expense"; }

const empty: FormState = { name: "", description: "", type: "Expense" };

const CategoriesPanel = () => {
    const dispatch = useAppDispatch();
    const { categories, loading } = useAppSelector(state => state.categories);

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Category | null>(null);
    const [form, setForm] = useState<FormState>(empty);
    const [confirmId, setConfirmId] = useState<string | null>(null);

    useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);

    const openCreate = () => { setEditing(null); setForm(empty); setOpen(true); };
    const openEdit = (c: Category) => { setEditing(c); setForm({ name: c.name, description: c.description, type: c.type }); setOpen(true); };

    const handleSave = async () => {
        try {
            if (editing) {
                await dispatch(updateCategory({ id: editing.id, data: form })).unwrap();
                toast.success("Category updated");
            } else {
                await dispatch(createCategory(form)).unwrap();
                toast.success("Category created");
            }
            setOpen(false);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Operation failed");
        }
    };

    const handleDelete = async () => {
        if (!confirmId) return;
        try {
            await dispatch(deleteCategory(confirmId)).unwrap();
            toast.success("Category deleted");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Delete failed");
        } finally {
            setConfirmId(null);
        }
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Categories</Typography>
                <Button variant="contained" size="small" onClick={openCreate}>+ Add Category</Button>
            </Box>

            <TableContainer component={Paper} elevation={1}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow><TableCell colSpan={4} align="center">Loading…</TableCell></TableRow>
                        ) : categories.map(c => (
                            <TableRow key={c.id} hover>
                                <TableCell>{c.name}</TableCell>
                                <TableCell>{c.description}</TableCell>
                                <TableCell>
                                    <Chip label={c.type} size="small" color={c.type === "Income" ? "success" : "error"} />
                                </TableCell>
                                <TableCell align="right">
                                    <Button size="small" onClick={() => openEdit(c)}>Edit</Button>
                                    <IconButton size="small" color="error" onClick={() => setConfirmId(c.id)}>✕</IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle>{editing ? "Edit Category" : "New Category"}</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: "16px !important" }}>
                    <TextField label="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} fullWidth />
                    <TextField label="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} fullWidth />
                    <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select label="Type" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as "Income" | "Expense" }))}>
                            <MenuItem value="Income">Income</MenuItem>
                            <MenuItem value="Expense">Expense</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={!!confirmId} onClose={() => setConfirmId(null)} maxWidth="xs" fullWidth>
                <DialogTitle>Delete Category?</DialogTitle>
                <DialogContent><Typography>This action cannot be undone.</Typography></DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmId(null)}>Cancel</Button>
                    <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CategoriesPanel;