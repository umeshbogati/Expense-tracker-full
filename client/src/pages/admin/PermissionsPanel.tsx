import { useEffect, useState } from "react";
import {
    Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TextField, Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { fetchPermissions, createPermission, updatePermission, deletePermission } from "../../store/slices/permissionSlice";
import type { Permission } from "../../interfaces/permission";
import { toast } from "react-toastify";

interface FormState { name: string; description: string; }

const empty: FormState = { name: "", description: "" };

const PermissionsPanel = () => {
    const dispatch = useAppDispatch();
    const { permissions, loading } = useAppSelector(state => state.permissions);

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Permission | null>(null);
    const [form, setForm] = useState<FormState>(empty);
    const [confirmId, setConfirmId] = useState<string | null>(null);

    useEffect(() => { dispatch(fetchPermissions()); }, [dispatch]);

    const openCreate = () => { setEditing(null); setForm(empty); setOpen(true); };
    const openEdit = (p: Permission) => { setEditing(p); setForm({ name: p.name, description: p.description }); setOpen(true); };
    const handleClose = () => setOpen(false);

    const handleSave = async () => {
        try {
            if (editing) {
                await dispatch(updatePermission({ id: editing.id, data: form })).unwrap();
                toast.success("Permission updated");
            } else {
                await dispatch(createPermission(form)).unwrap();
                toast.success("Permission created");
            }
            setOpen(false);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Operation failed");
        }
    };

    const handleDelete = async () => {
        if (!confirmId) return;
        try {
            await dispatch(deletePermission(confirmId)).unwrap();
            toast.success("Permission deleted");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Delete failed");
        } finally {
            setConfirmId(null);
        }
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Permissions</Typography>
                <Button variant="contained" size="small" onClick={openCreate}>+ Add Permission</Button>
            </Box>

            <TableContainer component={Paper} elevation={1}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow><TableCell colSpan={3} align="center">Loading…</TableCell></TableRow>
                        ) : permissions.map(p => (
                            <TableRow key={p.id} hover>
                                <TableCell>{p.name}</TableCell>
                                <TableCell>{p.description}</TableCell>
                                <TableCell align="right">
                                    <Button size="small" onClick={() => openEdit(p)}>Edit</Button>
                                    <IconButton size="small" color="error" onClick={() => setConfirmId(p.id)}>✕</IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Create / Edit dialog */}
            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                <DialogTitle>{editing ? "Edit Permission" : "New Permission"}</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: "16px !important" }}>
                    <TextField label="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} fullWidth />
                    <TextField label="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>

            {/* Delete confirm dialog */}
            <Dialog open={!!confirmId} onClose={() => setConfirmId(null)} maxWidth="xs" fullWidth>
                <DialogTitle>Delete Permission?</DialogTitle>
                <DialogContent><Typography>This action cannot be undone.</Typography></DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmId(null)}>Cancel</Button>
                    <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PermissionsPanel;