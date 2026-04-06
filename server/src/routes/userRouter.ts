import { Router } from "express";
import * as userController from "../controllers/userController";
import { authenticate } from "../middlewares/authenticate";
import { authorizeWithPermission } from "../middlewares/authorizeWithPermission";
import appPermissions from "../constants/permission";

const router = Router();

router.get("/me", authenticate, userController.getMe);
router.get(
  "/",
  authenticate,
  authorizeWithPermission({ permissions: appPermissions.VIEW_USERS.name }),
  userController.getAll,
);
router.get("/:id", authenticate, userController.getById);
router.patch(
  "/:id/roles",
  authenticate,
  authorizeWithPermission({ permissions: appPermissions.MANAGE_USERS.name }),
  userController.assignRoles,
);
router.delete(
  "/:id/roles/:roleId",
  authenticate,
  authorizeWithPermission({ permissions: appPermissions.MANAGE_USERS.name }),
  userController.removeRole,
);

export default router;
