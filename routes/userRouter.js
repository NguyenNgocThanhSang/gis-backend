import { Router } from "express";
import {
  getAllUsers,
  getUser,
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  validateIdParam,
  validateAdmin,
  validateUpdateUserInput,
} from "../middleware/validationMiddleware.js";
const router = Router();

router.get("/", authenticateUser, validateAdmin, getAllUsers);
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
router.get("/:id", authenticateUser, validateAdmin, validateIdParam, getUser);

export default router;
