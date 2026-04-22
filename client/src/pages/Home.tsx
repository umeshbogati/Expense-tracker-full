import { useEffect } from "react";
import { useNavigate, Link } from "react-router";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Container,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { fetchUserTransactions } from "../store/slices/transactionSlice";

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

const GuestHome = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ minHeight: "calc(100vh - 64px)" }}>
            <Container maxWidth="md" sx={{ pt: 10, pb: 6, textAlign: "center" }}>
                <Typography variant="h3" fontWeight={700} gutterBottom>
                    Track Your Finances with Ease
                </Typography>
                <Typography variant="h6" color="text.secondary" mb={4}>
                    Expense Tracker helps you monitor income and expenses, upload receipts, and gain clarity on your financial health — all in one place.
                </Typography>

                <Stack direction="row" spacing={2} justifyContent="center" mb={8}>
                    <Button variant="contained" size="large" onClick={() => navigate("/login")}>
                        Login
                    </Button>
                    <Button variant="outlined" size="large" onClick={() => navigate("/register")}>
                        Register
                    </Button>
                </Stack>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={3} justifyContent="center">
                    {[
                        { title: "Track Income & Expenses", body: "Categorise every transaction and keep your records accurate." },
                        { title: "Upload Receipts", body: "Attach images or PDFs to transactions for a complete paper trail." },
                        { title: "View Your History", body: "Browse and filter your full transaction history any time." },
                    ].map((f) => (
                        <Card key={f.title} sx={{ flex: 1, textAlign: "left" }} elevation={2}>
                            <CardContent>
                                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                    {f.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {f.body}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
};

const Dashboard = () => {
    const dispatch = useAppDispatch();
    const { userId } = useAppSelector((state) => state.auth);
    const { userTransactions, loadingTransactions } = useAppSelector((state) => state.transactions);
    const { totalIncome, totalExpenses } = userTransactions.stats;
    const netBalance = totalIncome - totalExpenses;

    useEffect(() => {
        if (userId) dispatch(fetchUserTransactions({
            userId,
            page: 1,
            limit: 5
        }));
    }, [userId, dispatch]);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h5" fontWeight={600}>
                    Dashboard
                </Typography>
                <Button variant="contained" component={Link} to="/transactions/add">
                    + Add Transaction
                </Button>
            </Box>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={3} mb={4}>
                {[
                    { label: "Total Income", value: totalIncome, color: "success.main" },
                    { label: "Total Expenses", value: totalExpenses, color: "error.main" },
                    { label: "Net Balance", value: netBalance, color: netBalance >= 0 ? "success.main" : "error.main" },
                ].map((card) => (
                    <Card key={card.label} sx={{ flex: 1 }} elevation={2}>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {card.label}
                            </Typography>
                            <Typography variant="h5" fontWeight={700} color={card.color}>
                                {formatCurrency(card.value)}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Stack>

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6">Recent Transactions</Typography>
                <Button component={Link} to="/transactions" size="small">
                    View All
                </Button>
            </Box>

            {loadingTransactions ? (
                <Box display="flex" justifyContent="center" py={4}>
                    <CircularProgress />
                </Box>
            ) : userTransactions.data.length === 0 ? (
                <Typography color="text.secondary" py={2}>
                    No transactions yet.{" "}
                    <Link to="/transactions/add">Add your first one.</Link>
                </Typography>
            ) : (
                <TableContainer component={Paper} elevation={1}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell align="right">Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userTransactions.data.map((t) => (
                                <TableRow key={t.id} hover>
                                    <TableCell>{formatDate(t.date)}</TableCell>
                                    <TableCell>{t.description}</TableCell>
                                    <TableCell>{t.category.name}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={t.type}
                                            size="small"
                                            color={t.type === "Income" ? "success" : "error"}
                                        />
                                    </TableCell>
                                    <TableCell align="right" sx={{ color: t.type === "Income" ? "success.main" : "error.main", fontWeight: 600 }}>
                                        {t.type === "Expense" ? "-" : "+"}{formatCurrency(t.amount)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

const Home = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    return isAuthenticated ? <Dashboard /> : <GuestHome />;
};

export default Home;