import { Router } from "express";
import * as transactionController from "../controllers/transactionController";
import { validateRequestBody } from "../middlewares/validators";
import * as transactionSchema from "../schemas/transaction";
import { authenticate } from "../middlewares/authenticate";
import { upload } from "../middlewares/multer";
import { authorizeWithPermission } from "../middlewares/authorizeWithPermission";
import appPermissions, { SelfPermissions } from "../constants/permission";

const router = Router();

// TODO: Add authorization and permissions here
router.post("/", authenticate, upload.single("file"), validateRequestBody(transactionSchema.createTransaction), transactionController.create);

// TODO: Add authorization and permissions here
router.get("/", authenticate, authorizeWithPermission({permissions: appPermissions.VIEW_TRANSACTIONS.name}), transactionController.getAll);

router.get("/user/:id", authenticate, transactionController.getByUserId);

router.get("/:id", authenticate, transactionController.getById);

router.put("/:id", authenticate, upload.single("file"), transactionController.update);

router.delete("/:id", authenticate, transactionController.remove);


export default router;