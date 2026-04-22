import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { useForm, useWatch } from "react-hook-form";
import { Box, Button, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTransactionSchema, type CreateTransactionFormData } from "../schemas/transaction";
import { useEffect, useRef } from "react";
import { fetchCategories } from "../store/slices/categorySlice";
import { createTransaction } from "../store/slices/transactionSlice";
import { toast } from 'react-toastify';

const AddTransaction = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { categories, loading } = useAppSelector(state => state.categories);

    const { handleSubmit, register, formState: { errors, isSubmitting}, control, setValue } = useForm({
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

    const onSubmit = async (data: CreateTransactionFormData & { amount: number }) => {
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
    }

    if (loading) {
        return <CircularProgress />
    }

    return (
        <Box sx={{ maxWidth: 480, mx: "auto", mt: 6, px: 2 }}>
            <Typography variant="h5" mb={3}>
                Add Transaction
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={2}>
                <FormControl fullWidth error={!!errors.type}>
                    <InputLabel>Type</InputLabel>
                    <Select
                        label="Type"
                        defaultValue=""
                        inputProps={register("type")}
                        onChange={(e) => {
                            setValue("type", e.target.value as "Income" | "Expense", { shouldValidate: true });
                            setValue("category", "");
                        }}
                    >
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                    {errors.type && <FormHelperText>{errors.type.message}</FormHelperText>}
                </FormControl>

                <TextField
                    label="Amount"
                    type="number"
                    {...register("amount")}
                    error={!!errors.amount}
                    helperText={errors.amount?.message}
                />

                <TextField
                    label="Description"
                    {...register("description")}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                />

                <TextField
                    label="Date"
                    type="date"
                    InputLabelProps={{ shrink: true  }}
                    {...register("date")}
                    error={!!errors.date}
                    helperText={errors.date?.message}
                />

                <FormControl fullWidth error={!!errors.category}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        label="Category"
                        defaultValue=""
                        // disabled={!selectedType || loadingCategories}
                        inputProps={register("category")}
                        onChange={(e) =>
                            setValue("category", e.target.value as string, { shouldValidate: true })
                        }
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat.id} value={cat.name}>
                                {cat.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.category && <FormHelperText>{errors.category.message}</FormHelperText>}
                </FormControl>

                <Box>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,application/pdf"
                        style={{ display: "none" }}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            setValue("file", file ?? undefined, { shouldValidate: true });
                        }}
                    />
                    <Button variant="outlined" onClick={() => fileInputRef.current?.click()}>
                        {selectedFile ? selectedFile.name : "Attach Receipt (optional)"}
                    </Button>
                    {errors.file && (
                        <FormHelperText error>{errors.file.message}</FormHelperText>
                    )}
                </Box>

                <Button type="submit" variant="contained" disabled={isSubmitting}>
                    {isSubmitting ? "Saving…" : "Add Transaction"}
                </Button>
            </Box>
        </Box>
    )
};

export default AddTransaction;