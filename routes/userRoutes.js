import express from "express";
import { updateUser } from "../controllers/userController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";
import { deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.patch("/:id", requireAuth, updateUser, (req, res, next) => {
    requireRole("admin", req.user.id)(req, res, next);
});

router.delete("/:id", requireAuth, deleteUser, (req, res, next) => {
    requireRole("admin", req.user.id)(req, res, next);
});

export default router;
