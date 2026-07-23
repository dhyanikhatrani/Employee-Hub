import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";

import Employee from "../models/Employee";
import Attendance from "../models/Attendance";
import Leave from "../models/Leave";
import Payroll from "../models/Payroll";

export const getEmployeeReport = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
   const employees = await Employee.find()
  .populate("userId", "fullName email")
  .sort({ createdAt: -1 });

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

export const getAttendanceReport = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const attendance = await Attendance.find()
      .populate({
        path: "employeeId",
        populate: {
          path: "userId",
          select: "fullName email",
        },
      })
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getLeaveReport = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const leaves = await Leave.find()
      .populate({
        path: "employeeId",
        populate: {
          path: "userId",
          select: "fullName email",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leaves.length,
      data: leaves,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getPayrollReport = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const payroll = await Payroll.find()
      .populate({
        path: "employeeId",
        populate: {
          path: "userId",
          select: "fullName email",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: payroll.length,
      data: payroll,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

