import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { useForm, useWatch } from "react-hook-form";
import { Box, Button, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTransactionSchema } from "../schemas/transaction";
import { useEffect, useRef } from "react";
import { fetchCategories } from "../store/slices/categorySlice";
import { createTransaction } from "../store/slices/transactionSlice";
import { toast } from 'react-toastify';
const AddTransaction = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const { categories, loading } = useAppSelector(state => state.categories);
    const { handleSubmit, register, formState: { errors, isSubmitting }, control, setValue } = useForm({
        resolver: zodResolver(createTransactionSchema),
        mode: "onBlur"
    });
    const selectedFile = useWatch({
        control,
        name: "file"
    });
    // const selectedDescription = useWatch({
    //     control,
    //     name: "description"
    // })
    // console.log("Selected description:", selectedDescription);
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("amount", data.amount.toString());
        formData.append("description", data.description);
        formData.append("date", data.date);
        formData.append("type", data.type);
        formData.append("category", data.category);
        if (data.file) {
            formData.append("file", data.file);
        }
        try {
            await dispatch(createTransaction(formData)).unwrap();
            toast.success("Transaction created successfully");
            navigate("/transactions");
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to create transaction");
        }
    };
    if (loading) {
        return _jsx(CircularProgress, {});
    }
    return (_jsxs(Box, { sx: { maxWidth: 480, mx: "auto", mt: 6, px: 2 }, children: [_jsx(Typography, { variant: "h5", mb: 3, children: "Add Transaction" }), _jsxs(Box, { component: "form", onSubmit: handleSubmit(onSubmit), display: "flex", flexDirection: "column", gap: 2, children: [_jsxs(FormControl, { fullWidth: true, error: !!errors.type, children: [_jsx(InputLabel, { children: "Type" }), _jsxs(Select, { label: "Type", defaultValue: "", inputProps: register("type"), onChange: (e) => {
                                    setValue("type", e.target.value, { shouldValidate: true });
                                    setValue("category", "");
                                }, children: [_jsx(MenuItem, { value: "Income", children: "Income" }), _jsx(MenuItem, { value: "Expense", children: "Expense" })] }), errors.type && _jsx(FormHelperText, { children: errors.type.message })] }), _jsx(TextField, { label: "Amount", type: "number", ...register("amount"), error: !!errors.amount, helperText: errors.amount?.message }), _jsx(TextField, { label: "Description", ...register("description"), error: !!errors.description, helperText: errors.description?.message }), _jsx(TextField, { label: "Date", type: "date", InputLabelProps: { shrink: true }, ...register("date"), error: !!errors.date, helperText: errors.date?.message }), _jsxs(FormControl, { fullWidth: true, error: !!errors.category, children: [_jsx(InputLabel, { children: "Category" }), _jsx(Select, { label: "Category", defaultValue: "", 
                                // disabled={!selectedType || loadingCategories}
                                inputProps: register("category"), onChange: (e) => setValue("category", e.target.value, { shouldValidate: true }), children: categories.map((cat) => (_jsx(MenuItem, { value: cat.name, children: cat.name }, cat.id))) }), errors.category && _jsx(FormHelperText, { children: errors.category.message })] }), _jsxs(Box, { children: [_jsx("input", { ref: fileInputRef, type: "file", accept: "image/*,application/pdf", style: { display: "none" }, onChange: (e) => {
                                    const file = e.target.files?.[0];
                                    setValue("file", file ?? undefined, { shouldValidate: true });
                                } }), _jsx(Button, { variant: "outlined", onClick: () => fileInputRef.current?.click(), children: selectedFile ? selectedFile.name : "Attach Receipt (optional)" }), errors.file && (_jsx(FormHelperText, { error: true, children: errors.file.message }))] }), _jsx(Button, { type: "submit", variant: "contained", disabled: isSubmitting, children: isSubmitting ? "Saving…" : "Add Transaction" })] })] }));
};
export default AddTransaction;
