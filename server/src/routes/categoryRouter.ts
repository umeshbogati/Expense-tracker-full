import { Router } from "express";
import * as categoryController from "../controllers/categoryController";
import { validateRequestBody } from "../middlewares/validators";
import * as categorySchema from "../schemas/category";
import { authenticate } from "../middlewares/authenticate";
import { authorizeWithPermission } from "../middlewares/authorizeWithPermission";
import appPermissions from "../constants/permission";


const router = Router();

// TODO: Add authorization and permissions here
router.post("/", authenticate, authorizeWithPermission({ permissions: appPermissions.CREATE_CATEGORIES.name }), validateRequestBody(categorySchema.createCategory), categoryController.create);

// TODO: Add authorization and permissions here
router.get("/", authenticate, authorizeWithPermission({ permissions: appPermissions.VIEW_CATEGORIES.name }), categoryController.getAll);

export default router;