import express from "express";
import { createAttendance, getAllAttendance, } from "../controllers/attendanceController";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("admin", "hr"),
  createAttendance
);
router.get(
  "/",
  protect,
  authorize("admin", "hr"),
  getAllAttendance
);

export default router;