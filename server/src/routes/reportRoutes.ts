import express from "express";
import {
  getEmployeeReport,
  getAttendanceReport,
  getLeaveReport,
  getPayrollReport,
} from "../controllers/reportController";

import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = express.Router();

// Employee Report
router.get(
  "/employees",
  protect,
  authorize("admin", "hr"),
  getEmployeeReport
);

// Attendance Report
router.get(
  "/attendance",
  protect,
  authorize("admin", "hr"),
  getAttendanceReport
);

// Leave Report
router.get(
  "/leaves",
  protect,
  authorize("admin", "hr"),
  getLeaveReport
);

// Payroll Report
router.get(
  "/payroll",
  protect,
  authorize("admin", "hr"),
  getPayrollReport
);

export default router;