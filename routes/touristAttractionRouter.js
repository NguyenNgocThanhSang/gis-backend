import { Router } from "express";
const router = Router();

import {
  getAllTouristAttractions,
  createTouristAttraction,
  getTouristAttraction,
  updateTouristAttraction,
  deleteTouristAttraction,
} from "../controllers/touristAttractionController.js";
import {
  validateTouristAttractionInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

router
  .route("/")
  .get(getAllTouristAttractions)
  .post(validateTouristAttractionInput, createTouristAttraction);
router
  .route("/:id")
  .get(validateIdParam, getTouristAttraction)
  .patch(
    validateTouristAttractionInput,
    validateIdParam,
    updateTouristAttraction
  )
  .delete(validateIdParam, deleteTouristAttraction);

export default router;
