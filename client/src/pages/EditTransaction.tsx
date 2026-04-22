import { useEffect, useRef, useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  createTransactionSchema,
  type CreateTransactionFormData,
} from "../schemas/transaction";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import {
  fetchTransactionById,
  updateTransaction,
} from "../store/slices/transactionSlice";
import { fetchCategories } from "../store/slices/categorySlice";
import { toast } from "react-toastify";

const EditTransaction = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [clearedForId, setClearedForId] = useState<string | null>(null);
  const isExistingFileCleared = clearedForId === id;

  const { categories, loading: loadingCategories } = useAppSelector(
    (state) => state.categories,
  );
  const { currentTransaction, loadingById } = useAppSelector(
    (state) => state.transactions,
  );

  const {
    handleSubmit,
    register,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createTransactionSchema),
    mode: "onBlur",
  });

  const selectedFile = useWatch({
    control,
    name: "file",
  });

  // Fetch transaction and categories on mount
  useEffect(() => {
    if (!id) return;
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

  const onSubmit = async (
    data: CreateTransactionFormData & { amount: number },
  ) => {
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
    } else if (isExistingFileCleared && currentTransaction?.fileUrl) {
      // User cleared the existing file - send a signal to remove it
      formData.append("clearFile", "true");
    }

    try {
      await dispatch(updateTransaction({ id, formData })).unwrap();
      toast.success("Transaction updated successfully");
      navigate("/transactions");
    } catch (error) {
      toast.error("Failed to update transaction");
      console.error("Error updating transaction:", error);
    }
  };

  if (loadingById) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 480, mx: "auto", mt: 6, px: 2 }}>
      <Typography variant="h5" mb={3}>
        Edit Transaction
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.type}>
              <InputLabel>Type</InputLabel>
              <Select
                label="Type"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  reset((prev) => ({
                    ...prev,
                    type: e.target.value as "Income" | "Expense",
                    category: "",
                  }));
                }}
              >
                <MenuItem value="Income">Income</MenuItem>
                <MenuItem value="Expense">Expense</MenuItem>
              </Select>
              {errors.type && (
                <FormHelperText>{errors.type.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

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
          InputLabelProps={{ shrink: true }}
          {...register("date")}
          error={!!errors.date}
          helperText={errors.date?.message}
        />

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.category}>
              <InputLabel>Category</InputLabel>
              <Select label="Category" disabled={loadingCategories} {...field}>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && (
                <FormHelperText>{errors.category.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

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

          <Button
            variant="outlined"
            onClick={() => fileInputRef.current?.click()}
          >
            {selectedFile
              ? selectedFile.name
              : currentTransaction?.fileUrl && !isExistingFileCleared
                ? "Update Receipt"
                : "Add Receipt (optional)"}
          </Button>
          {currentTransaction?.fileUrl &&
            !isExistingFileCleared &&
            !selectedFile && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={1}
              >
                <Typography variant="caption" color="textSecondary">
                  Existing receipt attached
                </Typography>
                <Button
                  size="small"
                  color="error"
                  onClick={() => {
                    setClearedForId(id ?? null);
                  }}
                >
                  Clear
                </Button>
              </Box>
            )}
          {errors.file && (
            <FormHelperText error>{errors.file.message}</FormHelperText>
          )}
        </Box>

        <Box display="flex" gap={2}>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{ flex: 1 }}
          >
            {isSubmitting ? "Saving…" : "Update Transaction"}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/transactions")}
            sx={{ flex: 1 }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditTransaction;
