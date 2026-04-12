import { Router } from "express";
import * as authController from "../controllers/authController";
import { validateRequestBody } from "../middlewares/validators";
import * as authSchema from "../schemas/auth";

const router = Router();

router.post("/register", validateRequestBody(authSchema.createUser), authController.register);

router.post("/login", validateRequestBody(authSchema.login), authController.login);

// Generate access token based on refresh token
router.post("/refresh-token", authController.generateAccessTokenBasedOnRefreshToken);

// Logout user
router.post("/logout", validateRequestBody(authSchema.logout), authController.logout);

export default router;