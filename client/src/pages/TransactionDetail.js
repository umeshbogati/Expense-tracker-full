import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { Box, Chip, CircularProgress, Container, Divider, Paper, Stack, Typography, } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { fetchTransactionById } from "../store/slices/transactionSlice";
const formatCurrency = (amount) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
const isPdf = (url) => url.toLowerCase().includes(".pdf") || url.includes("application/pdf");
const TransactionDetail = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { currentTransaction, loadingById } = useAppSelector((state) => state.transactions);
    useEffect(() => {
        if (id)
            dispatch(fetchTransactionById(id));
    }, [id, dispatch]);
    if (loadingById) {
        return (_jsx(Box, { display: "flex", justifyContent: "center", pt: 8, children: _jsx(CircularProgress, {}) }));
    }
    if (!currentTransaction) {
        return (_jsx(Container, { maxWidth: "sm", sx: { py: 4 }, children: _jsx(Typography, { color: "text.secondary", children: "Transaction not found." }) }));
    }
    const t = currentTransaction;
    return (_jsxs(Container, { maxWidth: "sm", sx: { py: 4 }, children: [_jsx(Box, { component: Link, to: "/transactions", display: "flex", alignItems: "center", gap: 0.5, mb: 3, sx: { textDecoration: "none", color: "text.secondary" }, children: _jsx(Typography, { variant: "body2", children: "\u2190 Back to Transactions" }) }), _jsxs(Paper, { elevation: 2, sx: { p: 3 }, children: [_jsxs(Box, { display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2, children: [_jsx(Typography, { variant: "h6", fontWeight: 600, children: t.description }), _jsx(Chip, { label: t.type, color: t.type === "Income" ? "success" : "error" })] }), _jsxs(Typography, { variant: "h4", fontWeight: 700, color: t.type === "Income" ? "success.main" : "error.main", mb: 3, children: [t.type === "Expense" ? "-" : "+", formatCurrency(t.amount)] }), _jsx(Divider, { sx: { mb: 2 } }), _jsxs(Stack, { spacing: 1.5, children: [_jsxs(Box, { display: "flex", justifyContent: "space-between", children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Date" }), _jsx(Typography, { variant: "body2", children: formatDate(t.date) })] }), _jsxs(Box, { display: "flex", justifyContent: "space-between", children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Category" }), _jsx(Typography, { variant: "body2", children: t.category.name })] }), _jsxs(Box, { display: "flex", justifyContent: "space-between", children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Created" }), _jsx(Typography, { variant: "body2", children: formatDate(t.createdAt) })] })] }), t.fileUrl && (_jsxs(_Fragment, { children: [_jsx(Divider, { sx: { my: 2 } }), _jsx(Typography, { variant: "subtitle2", fontWeight: 600, mb: 1, children: "Attached Receipt" }), isPdf(t.fileUrl) ? (_jsx(Box, { component: "iframe", src: t.fileUrl, width: "100%", height: 480, sx: { border: "1px solid", borderColor: "divider", borderRadius: 1 }, title: "Receipt PDF" })) : (_jsx(Box, { component: "img", src: t.fileUrl, alt: "Receipt", sx: { width: "100%", borderRadius: 1, border: "1px solid", borderColor: "divider" } }))] }))] })] }));
};
export default TransactionDetail;
