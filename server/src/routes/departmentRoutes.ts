import express from "express";
import { createDepartment , getAllDepartments,getDepartmentById,} from "../controllers/departmentController";
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
router.get(
  "/:id",
  protect,
  authorize("admin", "hr"),
  getDepartmentById
);
export default router;