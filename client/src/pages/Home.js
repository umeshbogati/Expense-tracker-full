import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router";
import { Box, Button, Card, CardContent, Chip, CircularProgress, Container, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { fetchUserTransactions } from "../store/slices/transactionSlice";
const formatCurrency = (amount) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
const GuestHome = () => {
    const navigate = useNavigate();
    return (_jsx(Box, { sx: { minHeight: "calc(100vh - 64px)" }, children: _jsxs(Container, { maxWidth: "md", sx: { pt: 10, pb: 6, textAlign: "center" }, children: [_jsx(Typography, { variant: "h3", fontWeight: 700, gutterBottom: true, children: "Track Your Finances with Ease" }), _jsx(Typography, { variant: "h6", color: "text.secondary", mb: 4, children: "Expense Tracker helps you monitor income and expenses, upload receipts, and gain clarity on your financial health \u2014 all in one place." }), _jsxs(Stack, { direction: "row", spacing: 2, justifyContent: "center", mb: 8, children: [_jsx(Button, { variant: "contained", size: "large", onClick: () => navigate("/login"), children: "Login" }), _jsx(Button, { variant: "outlined", size: "large", onClick: () => navigate("/register"), children: "Register" })] }), _jsx(Stack, { direction: { xs: "column", sm: "row" }, spacing: 3, justifyContent: "center", children: [
                        { title: "Track Income & Expenses", body: "Categorise every transaction and keep your records accurate." },
                        { title: "Upload Receipts", body: "Attach images or PDFs to transactions for a complete paper trail." },
                        { title: "View Your History", body: "Browse and filter your full transaction history any time." },
                    ].map((f) => (_jsx(Card, { sx: { flex: 1, textAlign: "left" }, elevation: 2, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "subtitle1", fontWeight: 600, gutterBottom: true, children: f.title }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: f.body })] }) }, f.title))) })] }) }));
};
const Dashboard = () => {
    const dispatch = useAppDispatch();
    const { userId } = useAppSelector((state) => state.auth);
    const { userTransactions, loadingUserTransactions } = useAppSelector((state) => state.transactions);
    useEffect(() => {
        if (userId)
            dispatch(fetchUserTransactions({ userId }));
    }, [userId, dispatch]);
    const { totalIncome, totalExpenses, netBalance } = useMemo(() => {
        const totalIncome = userTransactions
            .filter((t) => t.type === "Income")
            .reduce((sum, t) => sum + t.amount, 0);
        const totalExpenses = userTransactions
            .filter((t) => t.type === "Expense")
            .reduce((sum, t) => sum + t.amount, 0);
        return { totalIncome, totalExpenses, netBalance: totalIncome - totalExpenses };
    }, [userTransactions]);
    const recentTransactions = userTransactions.slice(0, 5);
    console.log({ loadingUserTransactions });
    return (_jsxs(Container, { maxWidth: "lg", sx: { py: 4 }, children: [_jsxs(Box, { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, children: [_jsx(Typography, { variant: "h5", fontWeight: 600, children: "Dashboard" }), _jsx(Button, { variant: "contained", component: Link, to: "/transactions/add", children: "+ Add Transaction" })] }), _jsx(Stack, { direction: { xs: "column", sm: "row" }, spacing: 3, mb: 4, children: [
                    { label: "Total Income", value: totalIncome, color: "success.main" },
                    { label: "Total Expenses", value: totalExpenses, color: "error.main" },
                    { label: "Net Balance", value: netBalance, color: netBalance >= 0 ? "success.main" : "error.main" },
                ].map((card) => (_jsx(Card, { sx: { flex: 1 }, elevation: 2, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: card.label }), _jsx(Typography, { variant: "h5", fontWeight: 700, color: card.color, children: formatCurrency(card.value) })] }) }, card.label))) }), _jsxs(Box, { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1, children: [_jsx(Typography, { variant: "h6", children: "Recent Transactions" }), _jsx(Button, { component: Link, to: "/transactions", size: "small", children: "View All" })] }), loadingUserTransactions ? (_jsx(Box, { display: "flex", justifyContent: "center", py: 4, children: _jsx(CircularProgress, {}) })) : recentTransactions.length === 0 ? (_jsxs(Typography, { color: "text.secondary", py: 2, children: ["No transactions yet.", " ", _jsx(Link, { to: "/transactions/add", children: "Add your first one." })] })) : (_jsx(TableContainer, { component: Paper, elevation: 1, children: _jsxs(Table, { size: "small", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Date" }), _jsx(TableCell, { children: "Description" }), _jsx(TableCell, { children: "Category" }), _jsx(TableCell, { children: "Type" }), _jsx(TableCell, { align: "right", children: "Amount" })] }) }), _jsx(TableBody, { children: recentTransactions.map((t) => (_jsxs(TableRow, { hover: true, children: [_jsx(TableCell, { children: formatDate(t.date) }), _jsx(TableCell, { children: t.description }), _jsx(TableCell, { children: t.category.name }), _jsx(TableCell, { children: _jsx(Chip, { label: t.type, size: "small", color: t.type === "Income" ? "success" : "error" }) }), _jsxs(TableCell, { align: "right", sx: { color: t.type === "Income" ? "success.main" : "error.main", fontWeight: 600 }, children: [t.type === "Expense" ? "-" : "+", formatCurrency(t.amount)] })] }, t.id))) })] }) }))] }));
};
const Home = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    return isAuthenticated ? _jsx(Dashboard, {}) : _jsx(GuestHome, {});
};
export default Home;
