import express from "express";
import {
  createPayroll,
  getAllPayroll,
  getPayrollById,
  updatePayroll,
  deletePayroll,
  markPayrollAsPaid,
} from "../controllers/payrollController";

import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = express.Router();

// Create Payroll
router.post(
  "/",
  protect,
  authorize("admin", "hr"),
  createPayroll
);

// Get All Payroll
router.get(
  "/",
  protect,
  authorize("admin", "hr"),
  getAllPayroll
);

// Get Payroll By ID
router.get(
  "/:id",
  protect,
  authorize("admin", "hr"),
  getPayrollById
);

// Update Payroll
router.put(
  "/:id",
  protect,
  authorize("admin", "hr"),
  updatePayroll
);

// Delete Payroll
router.delete(
  "/:id",
  protect,
  authorize("admin", "hr"),
  deletePayroll
);

// Mark Salary as Paid
router.put(
  "/:id/pay",
  protect,
  authorize("admin", "hr"),
  markPayrollAsPaid
);

export default router;