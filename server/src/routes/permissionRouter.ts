import { Router } from "express";
import * as permissionController from "../controllers/permissionController";
import { validateRequestBody } from "../middlewares/validators";
import { createPermission } from "../schemas/permission";
import { authenticate } from "../middlewares/authenticate";
import { authorizeWithPermission } from "../middlewares/authorizeWithPermission";
import appPermissions from "../constants/permission";

const router = Router();

router.post(
  "/",
  authenticate,
  authorizeWithPermission({
    permissions: appPermissions.CREATE_PERMISSIONS.name,
  }),
  validateRequestBody(createPermission),
  permissionController.create,
);
router.get(
  "/",
  authenticate,
  authorizeWithPermission({
    permissions: appPermissions.VIEW_PERMISSIONS.name,
  }),
  permissionController.getAll,
);
router.get(
  "/:permissionId",
  authenticate,
  authorizeWithPermission({
    permissions: appPermissions.VIEW_PERMISSIONS.name,
  }),
  permissionController.getById,
);
router.patch(
  "/:permissionId",
  authenticate,
  authorizeWithPermission({
    permissions: appPermissions.UPDATE_PERMISSIONS.name,
  }),
  validateRequestBody(createPermission),
  permissionController.update,
);
router.delete(
  "/:permissionId",
  authenticate,
  authorizeWithPermission({
    permissions: appPermissions.DELETE_PERMISSIONS.name,
  }),
  permissionController.remove,
);

export default router;
