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
  validateAdmin,
} from "../middleware/validationMiddleware.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getAllTypes)
  .post(authenticateUser, validateAdmin, validateTypeInput, createType);
router
  .route("/:id")
  .get(validateIdParam, getType)
  .patch(
    authenticateUser,
    validateAdmin,
    validateTypeInput,
    validateIdParam,
    updateType
  )
  .delete(authenticateUser, validateAdmin, validateIdParam, deleteType);

export default router;
