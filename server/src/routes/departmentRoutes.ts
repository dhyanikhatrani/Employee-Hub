import express from "express";
import { createDepartment } from "../controllers/departmentController";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = express.Router();

router.post( "/",protect,authorize("admin", "hr"), createDepartment);

export default router;