import { useEffect } from "react";
import { Link, useParams } from "react-router";
import {
    Box,
    Chip,
    CircularProgress,
    Container,
    Divider,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { fetchTransactionById } from "../store/slices/transactionSlice";

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

const isPdf = (url: string) => url.toLowerCase().includes(".pdf") || url.includes("application/pdf");

const TransactionDetail = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { currentTransaction, loadingById } = useAppSelector((state) => state.transactions);

    useEffect(() => {
        if (id) dispatch(fetchTransactionById(id));
    }, [id, dispatch]);

    if (loadingById) {
        return (
            <Box display="flex" justifyContent="center" pt={8}>
                <CircularProgress />
            </Box>
        );
    }

    if (!currentTransaction) {
        return (
            <Container maxWidth="sm" sx={{ py: 4 }}>
                <Typography color="text.secondary">Transaction not found.</Typography>
            </Container>
        );
    }

    const t = currentTransaction;

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Box component={Link} to="/transactions" display="flex" alignItems="center" gap={0.5} mb={3} sx={{ textDecoration: "none", color: "text.secondary" }}>
                <Typography variant="body2">← Back to Transactions</Typography>
            </Box>

            <Paper elevation={2} sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h6" fontWeight={600}>
                        {t.description}
                    </Typography>
                    <Chip label={t.type} color={t.type === "Income" ? "success" : "error"} />
                </Box>

                <Typography variant="h4" fontWeight={700} color={t.type === "Income" ? "success.main" : "error.main"} mb={3}>
                    {t.type === "Expense" ? "-" : "+"}{formatCurrency(t.amount)}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Stack spacing={1.5}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">Date</Typography>
                        <Typography variant="body2">{formatDate(t.date)}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">Category</Typography>
                        <Typography variant="body2">{t.category.name}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">Created</Typography>
                        <Typography variant="body2">{formatDate(t.createdAt)}</Typography>
                    </Box>
                </Stack>

                {t.fileUrl && (
                    <>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle2" fontWeight={600} mb={1}>
                            Attached Receipt
                        </Typography>
                        {isPdf(t.fileUrl) ? (
                            <Box component="iframe" src={t.fileUrl} width="100%" height={480} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1 }} title="Receipt PDF" />
                        ) : (
                            <Box
                                component="img"
                                src={t.fileUrl}
                                alt="Receipt"
                                sx={{ width: "100%", borderRadius: 1, border: "1px solid", borderColor: "divider" }}
                            />
                        )}
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default TransactionDetail;