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
// Get department by ID
export const getDepartmentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
const { id } = req.params;
const department = await Department.findById(id);
if (!department) {
  res.status(404).json({
    success: false,
    message: "Department not found",
  });
  return;
}
res.status(200).json({
  success: true,
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
//update department by api
export const updateDepartment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
const { name, description, status } = req.body;
const department = await Department.findById(id);

if (!department) {
  res.status(404).json({
    success: false,
    message: "Department not found",
  });
  return;
}
const existingDepartment = await Department.findOne({ name });

if (
  existingDepartment &&
  existingDepartment._id.toString() !== department._id.toString()
) {
  res.status(400).json({
    success: false,
    message: "Department name already exists",
  });
  return;
}
const updatedDepartment = await Department.findByIdAndUpdate(
  id,
  {
    name,
    description,
    status,
  },
  {
    new: true,
  }
);
res.status(200).json({
  success: true,
  message: "Department updated successfully",
  data: updatedDepartment,
});

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
