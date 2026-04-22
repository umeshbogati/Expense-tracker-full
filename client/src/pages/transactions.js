import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Box, Button, Chip, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { fetchUserTransactions, deleteTransaction } from "../store/slices/transactionSlice";
import { toast } from "react-toastify";
const formatCurrency = (amount) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
const Transactions = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { userId } = useAppSelector((state) => state.auth);
    const { userTransactions, loadingUserTransactions, pagination } = useAppSelector((state) => state.transactions);
    const [confirmId, setConfirmId] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    useEffect(() => {
        if (userId)
            dispatch(fetchUserTransactions({ userId }));
    }, [userId, dispatch]);
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
    return (_jsxs(Container, { maxWidth: "lg", sx: { py: 4 }, children: [_jsxs(Box, { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, children: [_jsx(Typography, { variant: "h5", fontWeight: 600, children: "My Transactions" }), _jsx(Button, { variant: "contained", component: Link, to: "/transactions/add", children: "+ Add Transaction" })] }), loadingUserTransactions ? (_jsx(Box, { display: "flex", justifyContent: "center", py: 6, children: _jsx(CircularProgress, {}) })) : userTransactions.length === 0 ? (_jsxs(Typography, { color: "text.secondary", py: 4, children: ["No transactions yet. ", _jsx(Link, { to: "/transactions/add", children: "Add your first one." })] })) : (_jsxs(Paper, { children: [_jsx(TableContainer, { component: Paper, elevation: 1, children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Date" }), _jsx(TableCell, { children: "Description" }), _jsx(TableCell, { children: "Category" }), _jsx(TableCell, { children: "Type" }), _jsx(TableCell, { align: "right", children: "Amount" }), _jsx(TableCell, { align: "center", children: "Actions" })] }) }), _jsx(TableBody, { children: userTransactions.map((t) => (_jsxs(TableRow, { hover: true, children: [_jsx(TableCell, { children: formatDate(t.date) }), _jsx(TableCell, { children: t.description }), _jsx(TableCell, { children: t.category.name }), _jsx(TableCell, { children: _jsx(Chip, { label: t.type, size: "small", color: t.type === "Income" ? "success" : "error" }) }), _jsxs(TableCell, { align: "right", sx: { color: t.type === "Income" ? "success.main" : "error.main", fontWeight: 600 }, children: [t.type === "Expense" ? "-" : "+", formatCurrency(t.amount)] }), _jsxs(TableCell, { align: "center", children: [_jsx(Button, { size: "small", onClick: () => navigate(`/transactions/${t.id}`), children: "View" }), _jsx(Button, { size: "small", onClick: () => navigate(`/transactions/${t.id}/edit`), children: "Edit" }), _jsx(Button, { size: "small", color: "error", onClick: () => setConfirmId(t.id), children: "Delete" })] })] }, t.id))) })] }) }), _jsx(TablePagination, { component: "div", count: pagination.total ?? 0, page: page, onPageChange: (_, newPage) => setPage(newPage), rowsPerPage: rowsPerPage, onRowsPerPageChange: (e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }, rowsPerPageOptions: [2, 5, 10, 25, 50] })] })), _jsxs(Dialog, { open: !!confirmId, onClose: () => setConfirmId(null), maxWidth: "xs", fullWidth: true, children: [_jsx(DialogTitle, { children: "Delete Transaction?" }), _jsx(DialogContent, { children: _jsx(Typography, { children: "This action cannot be undone. Any attached receipt will also be deleted." }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: () => setConfirmId(null), children: "Cancel" }), _jsx(Button, { onClick: handleDelete, variant: "contained", color: "error", children: "Delete" })] })] })] }));
};
export default Transactions;
