import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Employee from "../models/Employee";
import Department from "../models/Department";
import Attendance from "../models/Attendance";
import Leave from "../models/Leave";
import Payroll from "../models/Payroll";

//dashboard summary api
export const getDashboardSummary = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const totalEmployees = await Employee.countDocuments();

    const totalDepartments = await Department.countDocuments();

    const pendingLeaves = await Leave.countDocuments({
      status: "Pending",
    });

    const paidPayrolls = await Payroll.countDocuments({
      paymentStatus: "Paid",
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayAttendance = await Attendance.countDocuments({
      date: { $gte: today },
    });

    res.status(200).json({
      success: true,
      data: {
        totalEmployees,
        totalDepartments,
        todayAttendance,
        pendingLeaves,
        paidPayrolls,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//attendance analytics

export const getAttendanceAnalytics = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
    try {
        const present = await Attendance.countDocuments({
    status: "Present",
    });

    const absent = await Attendance.countDocuments({
    status: "Absent",
    });

    const halfDay = await Attendance.countDocuments({
    status: "Half Day",
    });

    res.status(200).json({
      success: true,
      data: {
        present,
        absent,
        halfDay,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//leave analytics
export const getLeaveAnalytics = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const pending = await Leave.countDocuments({
      status: "Pending",
    });

    const approved = await Leave.countDocuments({
      status: "Approved",
    });

    const rejected = await Leave.countDocuments({
      status: "Rejected",
    });

    res.status(200).json({
      success: true,
      data: {
        pending,
        approved,
        rejected,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//payroll analytics
export const getPayrollAnalytics = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const paid = await Payroll.countDocuments({
      paymentStatus: "Paid",
    });

    const pending = await Payroll.countDocuments({
      paymentStatus: "Pending",
    });

    const payrolls = await Payroll.find();

    const totalSalary = payrolls.reduce(
      (sum, payroll) => sum + payroll.netSalary,
      0
    );

    res.status(200).json({
      success: true,
      data: {
        paid,
        pending,
        totalSalary,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//recent employees
export const getRecentEmployees = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const employees = await Employee.find()
      .populate("userId", "fullName email")
      .populate("departmentId", "departmentName")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
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