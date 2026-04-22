import { Router } from "express";
import * as categoryController from "../controllers/categoryController";
import { validateRequestBody } from "../middlewares/validators";
import * as categorySchema from "../schemas/category";
import { authenticate } from "../middlewares/authenticate";
import { authorizeWithPermission } from "../middlewares/authorizeWithPermission";
import appPermissions from "../constants/permission";

const router = Router();

router.post("/", authenticate, authorizeWithPermission({ permissions: appPermissions.CREATE_CATEGORIES.name }), validateRequestBody(categorySchema.createCategory), categoryController.create);

router.get("/", authenticate, categoryController.getAll);

router.put("/:id", authenticate, authorizeWithPermission({ permissions: appPermissions.UPDATE_CATEGORIES.name }), categoryController.update);

router.delete("/:id", authenticate, authorizeWithPermission({ permissions: appPermissions.DELETE_CATEGORIES.name }), categoryController.remove);

export default router;