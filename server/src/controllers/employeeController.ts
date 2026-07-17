import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/User";
import Employee from "../models/Employee";

export const createEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
  fullName,
  email,
  password,
  phone,
  address,
  department,
  designation,
  joiningDate,
  gender,
  dateOfBirth,
  emergencyContact,
} = req.body;
const existingUser = await User.findOne({ email });

if (existingUser) {
  res.status(400).json({
    success: false,
    message: "Email already exists",
  });

  return;
}

const hashedPassword = await bcrypt.hash(password, 10);

const employeeCount = await Employee.countDocuments();

const employeeId = `EMP${String(employeeCount + 1).padStart(3, "0")}`;

const user = await User.create({
  fullName,
  email,
  password: hashedPassword,
  role: "employee",
});

const employee = await Employee.create({
  userId: user._id,
  employeeId,
  phone,
  address,
  department,
  designation,
  joiningDate,
  profileImage: "",
  gender,
  dateOfBirth,
  emergencyContact,
});

res.status(201).json({
  success: true,
  message: "Employee created successfully",
  data: employee,
});
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllEmployees = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employees = await Employee.find().populate(
  "userId",
  "fullName email"
);
res.status(200).json({
  success: true,
  count: employees.length,
  data: employees,
});

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getEmployeeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id).populate(
  "userId",
  "fullName email"
);
if (!employee) {
  res.status(404).json({
    success: false,
    message: "Employee not found",
  });
  return;
}
res.status(200).json({
  success: true,
  data: employee,
});

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};