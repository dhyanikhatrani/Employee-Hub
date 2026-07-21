import express from "express";
import {
  getDashboardSummary,
  getAttendanceAnalytics,
  getLeaveAnalytics,
  getPayrollAnalytics,
  getRecentEmployees,
} from "../controllers/dashboardController";

import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = express.Router();

router.get(
  "/summary",
  protect,
  authorize("admin", "hr"),
  getDashboardSummary
);

router.get(
  "/attendance",
  protect,
  authorize("admin", "hr"),
  getAttendanceAnalytics
);

router.get(
  "/leave",
  protect,
  authorize("admin", "hr"),
  getLeaveAnalytics
);

router.get(
  "/payroll",
  protect,
  authorize("admin", "hr"),
  getPayrollAnalytics
);

router.get(
  "/recent-employees",
  protect,
  authorize("admin", "hr"),
  getRecentEmployees
);

export default router;