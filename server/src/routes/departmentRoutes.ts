import express from "express";
import { createDepartment , getAllDepartments,} from "../controllers/departmentController";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = express.Router();

router.post( "/",protect,authorize("admin", "hr"), createDepartment);
router.get(
  "/",
  protect,
  authorize("admin", "hr"),
  getAllDepartments
);
export default router;