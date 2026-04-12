// src/pages/Register.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/auth"; // define your Zod schema for register
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import { register as registerAPI } from "../api/auth";
import { z } from "zod";

// Type inferred from Zod schema
export type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  // react-hook-form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  // State for show/hide password
  const [showPassword, setShowPassword] = useState(false);

  // Form submit
  const onSubmit = async (data: RegisterFormData) => {
    console.log("Registration successful");
    try {
      await registerAPI(data);
      toast.success("Registration successful! Please login.");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error("Failed to register. Try again.");
    }
  };

  return (
    <Box
      margin="40px auto"
      maxWidth={600}
      padding={4}
      boxShadow="0 0 10px rgba(0,0,0,0.1)"
      borderRadius={2}
    >
      <Typography variant="h4" textAlign="center" mb={4}>
        Register
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          maxWidth={400}
          mx="auto"
        >
          {/* Name Input */}
          <TextField
            label="Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
          />

          {/* Email Input */}
          <TextField
            label="Email"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />

          {/* Password Input with Show/Hide */}
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
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Register;
