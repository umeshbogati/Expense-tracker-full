import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
    Box, Button, Chip, CircularProgress, Container, Dialog, DialogActions,
    DialogContent, DialogTitle, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TablePagination, TableRow, Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { fetchUserTransactions, deleteTransaction } from "../store/slices/transactionSlice";
import { toast } from "react-toastify";

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

const Transactions = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { userId } = useAppSelector((state) => state.auth);
    const { userTransactions, loadingUserTransactions, pagination } = useAppSelector((state) => state.transactions);
    const [confirmId, setConfirmId] = useState<string | null>(null);
        const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        if (userId) dispatch(fetchUserTransactions({userId}));
    }, [userId, dispatch]);

    const handleDelete = async () => {
        if (!confirmId) return;
        try {
            await dispatch(deleteTransaction(confirmId)).unwrap();
            toast.success("Transaction deleted");
        } catch {
            toast.error("Failed to delete transaction");
        } finally {
            setConfirmId(null);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight={600}>My Transactions</Typography>
                <Button variant="contained" component={Link} to="/transactions/add">+ Add Transaction</Button>
            </Box>

            {loadingUserTransactions ? (
                <Box display="flex" justifyContent="center" py={6}><CircularProgress /></Box>
            ) : userTransactions.length === 0 ? (
                <Typography color="text.secondary" py={4}>
                    No transactions yet. <Link to="/transactions/add">Add your first one.</Link>
                </Typography>
            ) : (
                <Paper>
                <TableContainer component={Paper} elevation={1}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userTransactions.map((t) => (
                                <TableRow key={t.id} hover>
                                    <TableCell>{formatDate(t.date)}</TableCell>
                                    <TableCell>{t.description}</TableCell>
                                    <TableCell>{t.category.name}</TableCell>
                                    <TableCell>
                                        <Chip label={t.type} size="small" color={t.type === "Income" ? "success" : "error"} />
                                    </TableCell>
                                    <TableCell align="right" sx={{ color: t.type === "Income" ? "success.main" : "error.main", fontWeight: 600 }}>
                                        {t.type === "Expense" ? "-" : "+"}{formatCurrency(t.amount)}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button size="small" onClick={() => navigate(`/transactions/${t.id}`)}>View</Button>
                                        <Button size="small" onClick={() => navigate(`/transactions/${t.id}/edit`)}>Edit</Button>
                                        <Button size="small" color="error" onClick={() => setConfirmId(t.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={pagination.total ?? 0}
                    page={page}
                    onPageChange={(_, newPage) => setPage(newPage)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
                    rowsPerPageOptions={[2, 5, 10, 25, 50]}
                />
                </Paper>

            )}

            <Dialog open={!!confirmId} onClose={() => setConfirmId(null)} maxWidth="xs" fullWidth>
                <DialogTitle>Delete Transaction?</DialogTitle>
                <DialogContent><Typography>This action cannot be undone. Any attached receipt will also be deleted.</Typography></DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmId(null)}>Cancel</Button>
                    <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Transactions;