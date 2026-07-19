import { Request, Response } from "express";
import Department from "../models/Department";
export const createDepartment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, status } = req.body;
    const existingDepartment = await Department.findOne({ name });

if (existingDepartment) {
  res.status(400).json({
    success: false,
    message: "Department already exists",
  });
  return;
}
const department = await Department.create({
  name,
  description,
  status,
});
res.status(201).json({
  success: true,
  message: "Department created successfully",
  data: department,
});
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Get all departments
export const getAllDepartments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
const departments = await Department.find();
res.status(200).json({
  success: true,
  count: departments.length,
  data: departments,
});
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
