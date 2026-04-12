import { Router } from "express";
import * as roleController from "../controllers/roleController";
import { validateRequestBody } from "../middlewares/validators";
import { authenticate } from "../middlewares/authenticate";
import { authorizeWithPermission } from "../middlewares/authorizeWithPermission";
import appPermissions from "../constants/permission";
import * as roleSchema from "../schemas/role";

const router = Router();

router.post("/", authenticate, authorizeWithPermission({ permissions: appPermissions.CREATE_ROLES.name }), validateRequestBody(roleSchema.createRole), roleController.create);

router.get("/", authenticate, authorizeWithPermission({ permissions: appPermissions.VIEW_PERMISSIONS.name }), roleController.getAll);

export default router;