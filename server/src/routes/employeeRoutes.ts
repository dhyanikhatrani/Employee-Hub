import express from "express";

import { createEmployee,getAllEmployees,getEmployeeById,updateEmployee, deleteEmployee, } from "../controllers/employeeController";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";


const router = express.Router();

// Create Employee
router.post("/", protect, authorize("admin", "hr"), createEmployee);
router.get("/", protect, authorize("admin", "hr"), getAllEmployees);
router.get("/:id", protect, authorize("admin", "hr"), getEmployeeById);  
router.put("/:id",protect, authorize("admin", "hr"),updateEmployee);
router.delete("/:id",  protect,authorize("admin", "hr"),deleteEmployee);
export default router;