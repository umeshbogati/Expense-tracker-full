import { useEffect, useState } from "react";
import {
    Box, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControlLabel, FormGroup, IconButton, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, TextField, Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { fetchRoles, createRole, updateRole, deleteRole } from "../../store/slices/roleSlice";
import { fetchPermissions } from "../../store/slices/permissionSlice";
import type { RoleWithPermission } from "../../interfaces/role";
import { toast } from "react-toastify";

interface FormState { name: string; description: string; permissions: string[]; }

const empty: FormState = { name: "", description: "", permissions: [] };

const RolesPanel = () => {
    const dispatch = useAppDispatch();
    const { roles, loading } = useAppSelector(state => state.roles);
    const { permissions } = useAppSelector(state => state.permissions);

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<RoleWithPermission | null>(null);
    const [form, setForm] = useState<FormState>(empty);
    const [confirmId, setConfirmId] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchRoles());
        dispatch(fetchPermissions());
    }, [dispatch]);

    const openCreate = () => { setEditing(null); setForm(empty); setOpen(true); };
    const openEdit = (r: RoleWithPermission) => {
        setEditing(r);
        setForm({ name: r.name, description: r.description, permissions: r.permissions.map(p => p.name) });
        setOpen(true);
    };

    const togglePermission = (name: string) => {
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
            } else {
                await dispatch(createRole(form)).unwrap();
                toast.success("Role created");
            }
            setOpen(false);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Operation failed");
        }
    };

    const handleDelete = async () => {
        if (!confirmId) return;
        try {
            await dispatch(deleteRole(confirmId)).unwrap();
            toast.success("Role deleted");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Delete failed");
        } finally {
            setConfirmId(null);
        }
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Roles</Typography>
                <Button variant="contained" size="small" onClick={openCreate}>+ Add Role</Button>
            </Box>

            <TableContainer component={Paper} elevation={1}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Permissions</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow><TableCell colSpan={4} align="center">Loading…</TableCell></TableRow>
                        ) : roles.map(r => (
                            <TableRow key={r.id} hover>
                                <TableCell>{r.name}</TableCell>
                                <TableCell>{r.description}</TableCell>
                                <TableCell>
                                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                                        {r.permissions.map(p => <Chip key={p.id} label={p.name} size="small" />)}
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <Button size="small" onClick={() => openEdit(r)}>Edit</Button>
                                    <IconButton size="small" color="error" onClick={() => setConfirmId(r.id)}>✕</IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>{editing ? "Edit Role" : "New Role"}</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: "16px !important" }}>
                    <TextField label="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} fullWidth />
                    <TextField label="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} fullWidth />
                    <Typography variant="subtitle2">Permissions</Typography>
                    <FormGroup row>
                        {permissions.map(p => (
                            <FormControlLabel
                                key={p.id}
                                control={<Checkbox checked={form.permissions.includes(p.name)} onChange={() => togglePermission(p.name)} size="small" />}
                                label={<Typography variant="body2">{p.name}</Typography>}
                                sx={{ width: "50%" }}
                            />
                        ))}
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={!!confirmId} onClose={() => setConfirmId(null)} maxWidth="xs" fullWidth>
                <DialogTitle>Delete Role?</DialogTitle>
                <DialogContent><Typography>This action cannot be undone.</Typography></DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmId(null)}>Cancel</Button>
                    <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default RolesPanel;