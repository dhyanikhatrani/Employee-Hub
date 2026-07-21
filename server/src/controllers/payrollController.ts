import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Payroll from "../models/Payroll";
import Employee from "../models/Employee";

export const createPayroll = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const {
      employeeId,
      month,
      year,
      basicSalary,
      allowances,
      deductions,
    } = req.body;

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      res.status(404).json({
        success: false,
        message: "Employee not found",
      });
      return;
    }

    const existingPayroll = await Payroll.findOne({
      employeeId,
      month,
      year,
    });

    if (existingPayroll) {
      res.status(400).json({
        success: false,
        message: "Payroll already exists",
      });
      return;
    }

    const netSalary =
      basicSalary + allowances - deductions;

    const payroll = await Payroll.create({
      employeeId,
      month,
      year,
      basicSalary,
      allowances,
      deductions,
      netSalary,
    });

    res.status(201).json({
      success: true,
      message: "Payroll created successfully",
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

export const getAllPayroll = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const payrolls = await Payroll.find().populate({
      path: "employeeId",
      populate: {
        path: "userId",
        select: "fullName email",
      },
    });

    res.status(200).json({
      success: true,
      count: payrolls.length,
      data: payrolls,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//get payroll by id
export const getPayrollById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const payroll = await Payroll.findById(id).populate({
      path: "employeeId",
      populate: {
        path: "userId",
        select: "fullName email",
      },
    });

    if (!payroll) {
      res.status(404).json({
        success: false,
        message: "Payroll not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
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
//update payroll 
export const updatePayroll = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const {
      basicSalary,
      allowances,
      deductions,
      paymentStatus,
      paymentDate,
    } = req.body;

    const payroll = await Payroll.findById(id);

    if (!payroll) {
      res.status(404).json({
        success: false,
        message: "Payroll not found",
      });
      return;
    }

    payroll.basicSalary = basicSalary;
    payroll.allowances = allowances;
    payroll.deductions = deductions;
    payroll.netSalary = basicSalary + allowances - deductions;
    payroll.paymentStatus = paymentStatus;
    payroll.paymentDate = paymentDate;

    await payroll.save();

    res.status(200).json({
      success: true,
      message: "Payroll updated successfully",
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
//delete payroll
export const deletePayroll = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const payroll = await Payroll.findById(id);

    if (!payroll) {
      res.status(404).json({
        success: false,
        message: "Payroll not found",
      });
      return;
    }

    await Payroll.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Payroll deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//mark payroll as paid
export const markPayrollAsPaid = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const payroll = await Payroll.findById(id);

    if (!payroll) {
      res.status(404).json({
        success: false,
        message: "Payroll not found",
      });
      return;
    }

    payroll.paymentStatus = "Paid";
    payroll.paymentDate = new Date();

    await payroll.save();

    res.status(200).json({
      success: true,
      message: "Salary paid successfully",
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