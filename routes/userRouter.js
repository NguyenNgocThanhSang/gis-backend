import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  validateAdmin,
  validateUpdateUserInput,
} from "../middleware/validationMiddleware.js";
const router = Router();

router.get("/current-user", authenticateUser, getCurrentUser);
router.get(
  "/admin/app-stats",
  authenticateUser,
  validateAdmin,
  getApplicationStats
);
router.patch(
  "/update-user",
  authenticateUser,
  validateUpdateUserInput,
  updateUser
);

export default router;
