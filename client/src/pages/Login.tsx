import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/auth";
import { Box, Button, TextField, Typography } from "@mui/material";
import { z } from "zod";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { loginUser } from "../store/slices/authSlice";
import { useNavigate } from "react-router";
import { useEffect } from "react";


export type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      dispatch(loginUser(data)).unwrap();

      toast("Successful login", { type: "success" });
    } catch (error) {
      console.log("Error :", error);
      toast("Error logging in user", { type: "error" });
    }
  };

  // If user is logged in, they should not see LogIn page
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box
      margin="40px auto"
      maxWidth={600}
      padding={4}
      boxShadow="0 0 10px rgba(0,0,0,0.1)"
      borderRadius={2}
    >
      <Box>
        <Typography variant="h1" fontSize={36}>
          Login
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          maxWidth={400}
          margin="0 auto"
        >
          <TextField
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          {/* // Toggle password show/hide based on an icon. Use `useState` to track the password */}
          <TextField
            label="Password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
