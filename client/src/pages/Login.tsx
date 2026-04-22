import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from '../schemas/auth';
import { Box, Button, IconButton, InputAdornment, Link as MuiLink, Paper, TextField, Typography } from "@mui/material";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { loginUser } from '../store/slices/authSlice';
import { useNavigate, Link } from 'react-router';
import { toast } from 'react-toastify';

export type LoginFormData = z.infer<typeof loginSchema>

const Login = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector(state => state.auth);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            await dispatch(loginUser(data)).unwrap();
            navigate("/");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Login failed. Please check your credentials.");
        }
    };

    useEffect(() => {
        if (isAuthenticated) navigate("/");
    }, [isAuthenticated, navigate]);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="calc(100vh - 64px)" px={2}>
            <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 440, borderRadius: 2 }}>
                <Typography variant="h5" fontWeight={700} mb={0.5} textAlign="center">
                    Welcome back
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
                    Sign in to your account
                </Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={2}>
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
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(p => !p)} edge="end" size="small" tabIndex={-1}>
                                            {showPassword ? "🙈" : "👁️"}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />
                    <Button type="submit" variant="contained" fullWidth disabled={isSubmitting} sx={{ mt: 1, py: 1.2 }}>
                        {isSubmitting ? "Signing in…" : "Login"}
                    </Button>
                </Box>

                <Typography variant="body2" textAlign="center" mt={3}>
                    Don't have an account?{" "}
                    <MuiLink component={Link} to="/register">Register</MuiLink>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Login;