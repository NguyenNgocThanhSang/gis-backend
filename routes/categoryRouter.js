import { Router } from "express";
const router = Router();

import {
  getAllCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import {
  validateAdmin,
  validateCategoryInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getAllCategories)
  .post(authenticateUser, validateAdmin, validateCategoryInput, createCategory);
router
  .route("/:id")
  .get(validateIdParam, getCategory)
  .patch(
    authenticateUser,
    validateAdmin,
    validateCategoryInput,
    validateIdParam,
    updateCategory
  )
  .delete(authenticateUser, validateAdmin, validateIdParam, deleteCategory);

export default router;
