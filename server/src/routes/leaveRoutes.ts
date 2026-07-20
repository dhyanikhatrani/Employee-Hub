import express from "express";
import {
  applyLeave,
  getAllLeaves,
  getLeaveById,
  updateLeave,
  deleteLeave,
  approveLeave,
  rejectLeave,
} from "../controllers/leaveController";

import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = express.Router();

// Apply Leave
router.post(
  "/",
  protect,
  authorize("admin", "hr", "employee"),
  applyLeave
);

// Get All Leaves
router.get(
  "/",
  protect,
  authorize("admin", "hr"),
  getAllLeaves
);

// Get Leave By ID
router.get(
  "/:id",
  protect,
  authorize("admin", "hr", "employee"),
  getLeaveById
);

// Update Leave
router.put(
  "/:id",
  protect,
  authorize("admin", "hr"),
  updateLeave
);

// Delete Leave
router.delete(
  "/:id",
  protect,
  authorize("admin", "hr"),
  deleteLeave
);

// Approve Leave
router.put(
  "/:id/approve",
  protect,
  authorize("admin", "hr"),
  approveLeave
);

// Reject Leave
router.put(
  "/:id/reject",
  protect,
  authorize("admin", "hr"),
  rejectLeave
);

export default router;