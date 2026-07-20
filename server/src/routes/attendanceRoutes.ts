import express from "express";
import { createAttendance, getAllAttendance,  getAttendanceById,updateAttendance,deleteAttendance,} from "../controllers/attendanceController";
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
router.get(
  "/:id",
  protect,
  authorize("admin", "hr"),
  getAttendanceById
);
router.put(
  "/:id",
  protect,
  authorize("admin", "hr"),
  updateAttendance
);
router.delete(
  "/:id",
  protect,
  authorize("admin", "hr"),
  deleteAttendance
);

export default router;