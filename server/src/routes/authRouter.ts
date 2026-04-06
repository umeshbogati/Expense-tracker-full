import { Router } from "express";
import * as authController from "../controllers/authController";
import { validateRequestBody } from "../middlewares/validators";
import { createUser, login } from "../schemas/auth";

const router = Router();

router.post("/register", validateRequestBody(createUser), authController.register);

router.post("/login",validateRequestBody(login), authController.login);

router.post("/refresh-token", authController.generateAccessTokenBasedOnRefreshToken);

router.post("/logout", authController.logout);

export default router;