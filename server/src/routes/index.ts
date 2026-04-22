import { Router } from "express";
import authRoutes from "./authRouter";
import userRoutes from "./userRouter";
import permissionRoutes from "./permissionRouter";
import roleRoutes from "./roleRouter";
import categoryRoutes from "./categoryRouter";
import transactionRoutes from "./transactionRouter";


const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/permissions", permissionRoutes);
router.use("/roles", roleRoutes);
router.use("/categories", categoryRoutes);
router.use("/transactions", transactionRoutes);

export default router;