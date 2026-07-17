import express from "express";

import { createEmployee,getAllEmployees, } from "../controllers/employeeController";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";


const router = express.Router();

// Create Employee
router.post("/", protect, authorize("admin", "hr"), createEmployee);
router.get("/", protect, authorize("admin", "hr"), getAllEmployees);

export default router;