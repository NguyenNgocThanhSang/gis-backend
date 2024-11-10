import { Router } from "express";
const router = Router();
import {
  login,
  logout,
  register,
  validateToken,
} from "../controllers/authController.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.get("/logout", logout);
router.get("/validate", validateToken);

export default router;
