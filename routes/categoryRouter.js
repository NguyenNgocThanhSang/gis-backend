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
  validateCategoryInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

router
  .route("/")
  .get(getAllCategories)
  .post(validateCategoryInput, createCategory);
router
  .route("/:id")
  .get(validateIdParam, getCategory)
  .patch(validateCategoryInput, validateIdParam, updateCategory)
  .delete(validateIdParam, deleteCategory);

export default router;
