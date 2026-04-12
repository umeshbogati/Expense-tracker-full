import { Router } from "express";
import * as userController from "../controllers/userController";
import { authenticate } from "../middlewares/authenticate";
import { authorizeWithPermission } from "../middlewares/authorizeWithPermission";
import appPermissions from "../constants/permission";

const router = Router();

router.get("/me", authenticate, userController.getMe);

router.get("/", authenticate, authorizeWithPermission({ permissions: appPermissions.VIEW_USERS.name }), userController.getAll);

router.get("/:userId", authenticate, authorizeWithPermission({ permissions: appPermissions.VIEW_USERS.name }), userController.getById);

// Example of a protected route that requires "MANAGE_USERS" permission to update user roles
router.patch("/:userId/roles", authenticate, authorizeWithPermission({ permissions: appPermissions.MANAGE_USERS.name }), userController.updateUserRoles);

export default router;