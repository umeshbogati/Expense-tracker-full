import { Router } from "express";
import * as permissionController from "../controllers/permissionController";
import { validateRequestBody } from "../middlewares/validators";
import { authenticate } from "../middlewares/authenticate";
import { authorizeWithPermission } from "../middlewares/authorizeWithPermission";
import appPermissions from "../constants/permission";
import * as permissionSchema from "../schemas/permission";

const router = Router();

router.post("/", authenticate, authorizeWithPermission({ permissions: appPermissions.CREATE_PERMISSIONS.name }), validateRequestBody(permissionSchema.createPermission), permissionController.create);

router.get("/", authenticate, authorizeWithPermission({ permissions: appPermissions.VIEW_PERMISSIONS.name }), permissionController.getAll);

router.put("/:id", authenticate, authorizeWithPermission({ permissions: appPermissions.UPDATE_PERMISSIONS.name }), permissionController.update);

router.delete("/:id", authenticate, authorizeWithPermission({ permissions: appPermissions.DELETE_PERMISSIONS.name }), permissionController.remove);

export default router;