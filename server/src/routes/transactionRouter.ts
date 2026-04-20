import { Router } from "express";
import * as transactionController from "../controllers/transactionController";
import { validateRequestBody } from "../middlewares/validators";
import * as transactionSchema from "../schemas/transaction";
import { authenticate } from "../middlewares/authenticate";
import { upload } from "../middlewares/multer";

const router = Router();

// TODO: Add authorization and permissions here
router.post("/", authenticate, upload.single("file"), validateRequestBody(transactionSchema.createTransaction), transactionController.create);

// TODO: Add authorization and permissions here
router.get("/", authenticate, transactionController.getAll);

export default router;