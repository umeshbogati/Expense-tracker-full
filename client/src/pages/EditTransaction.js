import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";
import { Box, Button, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography, } from "@mui/material";
import { createTransactionSchema, } from "../schemas/transaction";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { fetchTransactionById, updateTransaction, } from "../store/slices/transactionSlice";
import { fetchCategories } from "../store/slices/categorySlice";
import { toast } from "react-toastify";
const EditTransaction = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const fileInputRef = useRef(null);
    const [clearedForId, setClearedForId] = useState(null);
    const isExistingFileCleared = clearedForId === id;
    const { categories, loading: loadingCategories } = useAppSelector((state) => state.categories);
    const { currentTransaction, loadingById } = useAppSelector((state) => state.transactions);
    const { handleSubmit, register, reset, control, setValue, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(createTransactionSchema),
        mode: "onBlur",
    });
    const selectedFile = useWatch({
        control,
        name: "file",
    });
    // Fetch transaction and categories on mount
    useEffect(() => {
        if (!id)
            return;
        dispatch(fetchTransactionById(id));
        dispatch(fetchCategories());
    }, [dispatch, id]);
    // Pre-fill form with existing transaction data
    useEffect(() => {
        if (currentTransaction) {
            // Format date to YYYY-MM-DD format
            const dateObj = new Date(currentTransaction.date);
            const formattedDate = dateObj.toISOString().split("T")[0];
            reset({
                type: currentTransaction.type,
                amount: currentTransaction.amount,
                description: currentTransaction.description,
                date: formattedDate,
                category: currentTransaction.category.name,
            });
        }
    }, [currentTransaction, reset]);
    const onSubmit = async (data) => {
        if (!id) {
            toast.error("Transaction ID not found");
            return;
        }
        const formData = new FormData();
        formData.append("amount", String(data.amount));
        formData.append("description", data.description);
        formData.append("date", data.date);
        formData.append("type", data.type);
        formData.append("category", data.category);
        if (data.file) {
            formData.append("file", data.file);
        }
        else if (isExistingFileCleared && currentTransaction?.fileUrl) {
            // User cleared the existing file - send a signal to remove it
            formData.append("clearFile", "true");
        }
        try {
            await dispatch(updateTransaction({ id, formData })).unwrap();
            toast.success("Transaction updated successfully");
            navigate("/transactions");
        }
        catch (error) {
            toast.error("Failed to update transaction");
            console.error("Error updating transaction:", error);
        }
    };
    if (loadingById) {
        return (_jsx(Box, { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", children: _jsx(CircularProgress, {}) }));
    }
    return (_jsxs(Box, { sx: { maxWidth: 480, mx: "auto", mt: 6, px: 2 }, children: [_jsx(Typography, { variant: "h5", mb: 3, children: "Edit Transaction" }), _jsxs(Box, { component: "form", onSubmit: handleSubmit(onSubmit), display: "flex", flexDirection: "column", gap: 2, children: [_jsx(Controller, { name: "type", control: control, render: ({ field }) => (_jsxs(FormControl, { fullWidth: true, error: !!errors.type, children: [_jsx(InputLabel, { children: "Type" }), _jsxs(Select, { label: "Type", ...field, onChange: (e) => {
                                        field.onChange(e);
                                        reset((prev) => ({
                                            ...prev,
                                            type: e.target.value,
                                            category: "",
                                        }));
                                    }, children: [_jsx(MenuItem, { value: "Income", children: "Income" }), _jsx(MenuItem, { value: "Expense", children: "Expense" })] }), errors.type && (_jsx(FormHelperText, { children: errors.type.message }))] })) }), _jsx(TextField, { label: "Amount", type: "number", ...register("amount"), error: !!errors.amount, helperText: errors.amount?.message }), _jsx(TextField, { label: "Description", ...register("description"), error: !!errors.description, helperText: errors.description?.message }), _jsx(TextField, { label: "Date", type: "date", InputLabelProps: { shrink: true }, ...register("date"), error: !!errors.date, helperText: errors.date?.message }), _jsx(Controller, { name: "category", control: control, render: ({ field }) => (_jsxs(FormControl, { fullWidth: true, error: !!errors.category, children: [_jsx(InputLabel, { children: "Category" }), _jsx(Select, { label: "Category", disabled: loadingCategories, ...field, children: categories.map((cat) => (_jsx(MenuItem, { value: cat.name, children: cat.name }, cat.id))) }), errors.category && (_jsx(FormHelperText, { children: errors.category.message }))] })) }), _jsxs(Box, { children: [_jsx("input", { ref: fileInputRef, type: "file", accept: "image/*,application/pdf", style: { display: "none" }, onChange: (e) => {
                                    const file = e.target.files?.[0];
                                    setValue("file", file ?? undefined, { shouldValidate: true });
                                } }), _jsx(Button, { variant: "outlined", onClick: () => fileInputRef.current?.click(), children: selectedFile
                                    ? selectedFile.name
                                    : currentTransaction?.fileUrl && !isExistingFileCleared
                                        ? "Update Receipt"
                                        : "Add Receipt (optional)" }), currentTransaction?.fileUrl &&
                                !isExistingFileCleared &&
                                !selectedFile && (_jsxs(Box, { display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1, children: [_jsx(Typography, { variant: "caption", color: "textSecondary", children: "Existing receipt attached" }), _jsx(Button, { size: "small", color: "error", onClick: () => {
                                            setClearedForId(id ?? null);
                                        }, children: "Clear" })] })), errors.file && (_jsx(FormHelperText, { error: true, children: errors.file.message }))] }), _jsxs(Box, { display: "flex", gap: 2, children: [_jsx(Button, { type: "submit", variant: "contained", disabled: isSubmitting, sx: { flex: 1 }, children: isSubmitting ? "Saving…" : "Update Transaction" }), _jsx(Button, { variant: "outlined", onClick: () => navigate("/transactions"), sx: { flex: 1 }, children: "Cancel" })] })] })] }));
};
export default EditTransaction;
