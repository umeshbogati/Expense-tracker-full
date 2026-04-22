import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
    Box, Button, Chip, CircularProgress, Container, Dialog, DialogActions,
    DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Paper,
    Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead,
    TablePagination, TableRow, TextField, Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { fetchUserTransactions, deleteTransaction } from "../store/slices/transactionSlice";
import { fetchCategories } from "../store/slices/categorySlice";
import { toast } from "react-toastify";

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

const Transactions = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { userId } = useAppSelector((state) => state.auth);
    const { userTransactions, loadingUserTransactions } = useAppSelector((state) => state.transactions);
    const { categories } = useAppSelector((state) => state.categories);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterType, setFilterType] = useState("");
    const [filterCategoryId, setFilterCategoryId] = useState("");
    const [filterStartDate, setFilterStartDate] = useState("");
    const [filterEndDate, setFilterEndDate] = useState("");
    const [confirmId, setConfirmId] = useState<string | null>(null);

    useEffect(() => {
        if (categories.length === 0) dispatch(fetchCategories());
    }, [categories.length, dispatch]);

    useEffect(() => {
        if (!userId) return;
        dispatch(fetchUserTransactions({
            userId,
            page: page + 1,
            limit: rowsPerPage,
            ...(filterType && { type: filterType }),
            ...(filterCategoryId && { categoryId: filterCategoryId }),
            ...(filterStartDate && { startDate: filterStartDate }),
            ...(filterEndDate && { endDate: filterEndDate }),
        }));
    }, [userId, page, rowsPerPage, filterType, filterCategoryId, filterStartDate, filterEndDate, dispatch]);

    const handleFilterChange = (setter: (v: string) => void) => (val: string) => {
        setter(val);
        setPage(0);
    };

    const handleClearFilters = () => {
        setFilterType("");
        setFilterCategoryId("");
        setFilterStartDate("");
        setFilterEndDate("");
        setPage(0);
    };

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

    const hasActiveFilters = filterType || filterCategoryId || filterStartDate || filterEndDate;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight={600}>My Transactions</Typography>
                <Button variant="contained" component={Link} to="/transactions/add">+ Add Transaction</Button>
            </Box>

            <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }} flexWrap="wrap">
                    <FormControl size="small" sx={{ minWidth: 130 }}>
                        <InputLabel>Type</InputLabel>
                        <Select
                            label="Type"
                            value={filterType}
                            onChange={(e) => handleFilterChange(setFilterType)(e.target.value)}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Income">Income</MenuItem>
                            <MenuItem value="Expense">Expense</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 160 }}>
                        <InputLabel>Category</InputLabel>
                        <Select
                            label="Category"
                            value={filterCategoryId}
                            onChange={(e) => handleFilterChange(setFilterCategoryId)(e.target.value)}
                        >
                            <MenuItem value="">All</MenuItem>
                            {categories.map((c) => (
                                <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        size="small"
                        label="Start Date"
                        type="date"
                        value={filterStartDate}
                        onChange={(e) => handleFilterChange(setFilterStartDate)(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ minWidth: 150 }}
                    />

                    <TextField
                        size="small"
                        label="End Date"
                        type="date"
                        value={filterEndDate}
                        onChange={(e) => handleFilterChange(setFilterEndDate)(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ minWidth: 150 }}
                    />

                    {hasActiveFilters && (
                        <Button size="small" variant="outlined" onClick={handleClearFilters}>
                            Clear Filters
                        </Button>
                    )}
                </Stack>
            </Paper>

            {loadingUserTransactions ? (
                <Box display="flex" justifyContent="center" py={6}><CircularProgress /></Box>
            ) : userTransactions.data.length === 0 ? (
                <Typography color="text.secondary" py={4}>
                    No transactions found. {!hasActiveFilters && <Link to="/transactions/add">Add your first one.</Link>}
                </Typography>
            ) : (
                <Paper elevation={1}>
                    <TableContainer>
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
                                {userTransactions.data.map((t) => (
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
                        count={userTransactions.pagination.total}
                        page={page}
                        onPageChange={(_, newPage) => setPage(newPage)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
                        rowsPerPageOptions={[5, 10, 25, 50]}
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