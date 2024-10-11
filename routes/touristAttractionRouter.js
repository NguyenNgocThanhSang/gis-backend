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
  validateAdmin,
} from "../middleware/validationMiddleware.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getAllTouristAttractions)
  .post(
    authenticateUser,
    validateAdmin,
    validateTouristAttractionInput,
    createTouristAttraction
  );
router
  .route("/:id")
  .get(validateIdParam, getTouristAttraction)
  .patch(
    authenticateUser,
    validateAdmin,
    validateTouristAttractionInput,
    validateIdParam,
    updateTouristAttraction
  )
  .delete(
    authenticateUser,
    validateAdmin,
    validateIdParam,
    deleteTouristAttraction
  );

export default router;
