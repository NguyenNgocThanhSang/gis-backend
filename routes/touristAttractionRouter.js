import { Router } from "express";
const router = Router();

import {
  getAllTouristAttractions,
  createTouristAttraction,
  getTouristAttraction,
  updateTouristAttraction,
  deleteTouristAttraction,
} from "../controllers/touristAttractionController.js";

router.route("/").get(getAllTouristAttractions).post(createTouristAttraction);
router
  .route("/:id")
  .get(getTouristAttraction)
  .patch(updateTouristAttraction)
  .delete(deleteTouristAttraction);

export default router;
