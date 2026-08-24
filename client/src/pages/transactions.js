import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Box, Button, Chip, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { fetchUserTransactions, deleteTransaction } from "../store/slices/transactionSlice";
import { fetchCategories } from "../store/slices/categorySlice";
import { toast } from "react-toastify";
const formatCurrency = (amount) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
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
    const [confirmId, setConfirmId] = useState(null);
    useEffect(() => {
        if (categories.length === 0)
            dispatch(fetchCategories());
    }, [categories.length, dispatch]);
    useEffect(() => {
        if (!userId)
            return;
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
    const handleFilterChange = (setter) => (val) => {
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
        if (!confirmId)
            return;
        try {
            await dispatch(deleteTransaction(confirmId)).unwrap();
            toast.success("Transaction deleted");
        }
        catch {
            toast.error("Failed to delete transaction");
        }
        finally {
            setConfirmId(null);
        }
    };
    const hasActiveFilters = filterType || filterCategoryId || filterStartDate || filterEndDate;
    return (_jsxs(Container, { maxWidth: "lg", sx: { py: 4 }, children: [_jsxs(Box, { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, children: [_jsx(Typography, { variant: "h5", fontWeight: 600, children: "My Transactions" }), _jsx(Button, { variant: "contained", component: Link, to: "/transactions/add", children: "+ Add Transaction" })] }), _jsx(Paper, { elevation: 1, sx: { p: 2, mb: 2 }, children: _jsxs(Stack, { direction: { xs: "column", sm: "row" }, spacing: 2, alignItems: { sm: "center" }, flexWrap: "wrap", children: [_jsxs(FormControl, { size: "small", sx: { minWidth: 130 }, children: [_jsx(InputLabel, { children: "Type" }), _jsxs(Select, { label: "Type", value: filterType, onChange: (e) => handleFilterChange(setFilterType)(e.target.value), children: [_jsx(MenuItem, { value: "", children: "All" }), _jsx(MenuItem, { value: "Income", children: "Income" }), _jsx(MenuItem, { value: "Expense", children: "Expense" })] })] }), _jsxs(FormControl, { size: "small", sx: { minWidth: 160 }, children: [_jsx(InputLabel, { children: "Category" }), _jsxs(Select, { label: "Category", value: filterCategoryId, onChange: (e) => handleFilterChange(setFilterCategoryId)(e.target.value), children: [_jsx(MenuItem, { value: "", children: "All" }), categories.map((c) => (_jsx(MenuItem, { value: c.id, children: c.name }, c.id)))] })] }), _jsx(TextField, { size: "small", label: "Start Date", type: "date", value: filterStartDate, onChange: (e) => handleFilterChange(setFilterStartDate)(e.target.value), InputLabelProps: { shrink: true }, sx: { minWidth: 150 } }), _jsx(TextField, { size: "small", label: "End Date", type: "date", value: filterEndDate, onChange: (e) => handleFilterChange(setFilterEndDate)(e.target.value), InputLabelProps: { shrink: true }, sx: { minWidth: 150 } }), hasActiveFilters && (_jsx(Button, { size: "small", variant: "outlined", onClick: handleClearFilters, children: "Clear Filters" }))] }) }), loadingUserTransactions ? (_jsx(Box, { display: "flex", justifyContent: "center", py: 6, children: _jsx(CircularProgress, {}) })) : userTransactions.data.length === 0 ? (_jsxs(Typography, { color: "text.secondary", py: 4, children: ["No transactions found. ", !hasActiveFilters && _jsx(Link, { to: "/transactions/add", children: "Add your first one." })] })) : (_jsxs(Paper, { elevation: 1, children: [_jsx(TableContainer, { children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Date" }), _jsx(TableCell, { children: "Description" }), _jsx(TableCell, { children: "Category" }), _jsx(TableCell, { children: "Type" }), _jsx(TableCell, { align: "right", children: "Amount" }), _jsx(TableCell, { align: "center", children: "Actions" })] }) }), _jsx(TableBody, { children: userTransactions.data.map((t) => (_jsxs(TableRow, { hover: true, children: [_jsx(TableCell, { children: formatDate(t.date) }), _jsx(TableCell, { children: t.description }), _jsx(TableCell, { children: t.category.name }), _jsx(TableCell, { children: _jsx(Chip, { label: t.type, size: "small", color: t.type === "Income" ? "success" : "error" }) }), _jsxs(TableCell, { align: "right", sx: { color: t.type === "Income" ? "success.main" : "error.main", fontWeight: 600 }, children: [t.type === "Expense" ? "-" : "+", formatCurrency(t.amount)] }), _jsxs(TableCell, { align: "center", children: [_jsx(Button, { size: "small", onClick: () => navigate(`/transactions/${t.id}`), children: "View" }), _jsx(Button, { size: "small", onClick: () => navigate(`/transactions/${t.id}/edit`), children: "Edit" }), _jsx(Button, { size: "small", color: "error", onClick: () => setConfirmId(t.id), children: "Delete" })] })] }, t.id))) })] }) }), _jsx(TablePagination, { component: "div", count: userTransactions.pagination.total, page: page, onPageChange: (_, newPage) => setPage(newPage), rowsPerPage: rowsPerPage, onRowsPerPageChange: (e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }, rowsPerPageOptions: [5, 10, 25, 50] })] })), _jsxs(Dialog, { open: !!confirmId, onClose: () => setConfirmId(null), maxWidth: "xs", fullWidth: true, children: [_jsx(DialogTitle, { children: "Delete Transaction?" }), _jsx(DialogContent, { children: _jsx(Typography, { children: "This action cannot be undone. Any attached receipt will also be deleted." }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: () => setConfirmId(null), children: "Cancel" }), _jsx(Button, { onClick: handleDelete, variant: "contained", color: "error", children: "Delete" })] })] })] }));
};
export default Transactions;
