import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
const Login = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector(state => state.auth);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema),
        mode: "onBlur",
    });
    const onSubmit = async (data) => {
        try {
            await dispatch(loginUser(data)).unwrap();
            navigate("/");
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : "Login failed. Please check your credentials.");
        }
    };
    useEffect(() => {
        if (isAuthenticated)
            navigate("/");
    }, [isAuthenticated, navigate]);
    return (_jsx(Box, { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "calc(100vh - 64px)", px: 2, children: _jsxs(Paper, { elevation: 3, sx: { p: 4, width: "100%", maxWidth: 440, borderRadius: 2 }, children: [_jsx(Typography, { variant: "h5", fontWeight: 700, mb: 0.5, textAlign: "center", children: "Welcome back" }), _jsx(Typography, { variant: "body2", color: "text.secondary", textAlign: "center", mb: 3, children: "Sign in to your account" }), _jsxs(Box, { component: "form", onSubmit: handleSubmit(onSubmit), display: "flex", flexDirection: "column", gap: 2, children: [_jsx(TextField, { label: "Email", type: "email", ...register("email"), error: !!errors.email, helperText: errors.email?.message, fullWidth: true }), _jsx(TextField, { label: "Password", type: showPassword ? "text" : "password", ...register("password"), error: !!errors.password, helperText: errors.password?.message, fullWidth: true, slotProps: {
                                input: {
                                    endAdornment: (_jsx(InputAdornment, { position: "end", children: _jsx(IconButton, { onClick: () => setShowPassword(p => !p), edge: "end", size: "small", tabIndex: -1, children: showPassword ? "🙈" : "👁️" }) }))
                                }
                            } }), _jsx(Button, { type: "submit", variant: "contained", fullWidth: true, disabled: isSubmitting, sx: { mt: 1, py: 1.2 }, children: isSubmitting ? "Signing in…" : "Login" })] }), _jsxs(Typography, { variant: "body2", textAlign: "center", mt: 3, children: ["Don't have an account?", " ", _jsx(MuiLink, { component: Link, to: "/register", children: "Register" })] })] }) }));
};
export default Login;
