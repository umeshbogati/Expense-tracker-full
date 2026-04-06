import { Router } from "express";
import authRoutes from "./authRouter";
import userRoutes from "./userRouter";
import PermissionRoutes  from "./permissionRouter";
import roleRoutes from "./roleRouter";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/permissions", PermissionRoutes);
router.use("/roles", roleRoutes);

export default router;