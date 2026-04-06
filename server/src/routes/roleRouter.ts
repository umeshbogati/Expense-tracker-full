import { Router } from "express";
import * as roleController from "../controllers/roleController";
import { validateRequestBody } from "../middlewares/validators";
import { createRole } from "../schemas/role";
import { authenticate } from "../middlewares/authenticate";
import { authorizeWithPermission } from "../middlewares/authorizeWithPermission";
import appPermissions from "../constants/permission";

const router = Router();

router.post(
  "/",
  authenticate,
  authorizeWithPermission({ permissions: appPermissions.CREATE_ROLES.name }),
  validateRequestBody(createRole),
  roleController.create,
);
router.get(
  "/",
  authenticate,
  authorizeWithPermission({ permissions: appPermissions.VIEW_ROLES.name }),
  roleController.getAll,
);
router.get(
  "/:roleId",
  authenticate,
  authorizeWithPermission({ permissions: appPermissions.VIEW_ROLES.name }),
  roleController.getById,
);
router.patch(
  "/:roleId",
  authenticate,
  authorizeWithPermission({ permissions: appPermissions.UPDATE_ROLES.name }),
  validateRequestBody(createRole),
  roleController.update,
);
router.delete(
  "/:roleId",
  authenticate,
  authorizeWithPermission({ permissions: appPermissions.DELETE_ROLES.name }),
  roleController.remove,
);
router.post(
  "/:roleId/permissions",
  authenticate,
  authorizeWithPermission({ permissions: appPermissions.UPDATE_ROLES.name }),
  roleController.assignPermissions,
);
router.delete(
  "/:roleId/permissions/:permissionId",
  authenticate,
  authorizeWithPermission({ permissions: appPermissions.UPDATE_ROLES.name }),
  roleController.removePermission,
);

export default router;
