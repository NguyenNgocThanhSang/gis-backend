import { Router } from "express";
const router = Router();

import {
  getAllTypes,
  createType,
  getType,
  updateType,
  deleteType,
} from "../controllers/typeController.js";
import {
  validateTypeInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

router.route("/").get(getAllTypes).post(validateTypeInput, createType);
router
  .route("/:id")
  .get(validateIdParam, getType)
  .patch(validateTypeInput, validateIdParam, updateType)
  .delete(validateIdParam, deleteType);

export default router;
