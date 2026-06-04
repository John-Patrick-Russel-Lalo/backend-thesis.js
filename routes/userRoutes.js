import express from "express";
import { updateUser } from "../controllers/userController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";
import { deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.patch("/:id", requireAuth, requireRole("admin"), updateUser);

router.delete("/:id", requireAuth, requireRole("admin"), deleteUser);

export default router;
