import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/auth";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { z } from "zod";
import { useAppDispatch } from "../hooks/storeHooks";
import { registerUser } from "../store/slices/authSlice";
import { useNavigate, Link } from "react-router";
import { toast } from "react-toastify";

export type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      toast.success("Account created! Please log in.");
      navigate("/login");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.",
      );
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="calc(100vh - 64px)"
      px={2}
    >
      <Paper
        elevation={3}
        sx={{ p: 4, width: "100%", maxWidth: 440, borderRadius: 2 }}
      >
        <Typography variant="h5" fontWeight={700} mb={0.5} textAlign="center">
          Create account
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mb={3}
        >
          Start tracking your finances today
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((p) => !p)}
                    edge="end"
                    size="small"
                    tabIndex={-1}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            sx={{ mt: 1, py: 1.2 }}
          >
            {isSubmitting ? "Creating account…" : "Register"}
          </Button>
        </Box>

        <Typography variant="body2" textAlign="center" mt={3}>
          Already have an account?{" "}
          <MuiLink component={Link} to="/login">
            Login
          </MuiLink>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
