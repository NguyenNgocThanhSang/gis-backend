import { Router } from "express";
const router = Router();

import {
  getAllTypes,
  createType,
  getType,
  updateType,
  deleteType,
} from "../controllers/typeController.js";

router.route("/").get(getAllTypes).post(createType);
router.route("/:id").get(getType).patch(updateType).delete(deleteType);

export default router;
