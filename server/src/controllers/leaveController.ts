import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Leave from "../models/Leave";
import Employee from "../models/Employee";

export const applyLeave = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const {
      employeeId,
      leaveType,
      startDate,
      endDate,
      reason,
    } = req.body;

    // Check Employee Exists
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      res.status(404).json({
        success: false,
        message: "Employee not found",
      });
      return;
    }

    // Create Leave
    const leave = await Leave.create({
      employeeId,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    res.status(201).json({
      success: true,
      message: "Leave applied successfully",
      data: leave,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Get all leaves
export const getAllLeaves = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: {
        path: "userId",
        select: "fullName email",
      },
    });

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
// Get leave by ID
export const getLeaveById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const leave = await Leave.findById(id).populate({
      path: "employeeId",
      populate: {
        path: "userId",
        select: "fullName email",
      },
    });

    if (!leave) {
      res.status(404).json({
        success: false,
        message: "Leave not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: leave,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Update leave status
export const updateLeave = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const leave = await Leave.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!leave) {
      res.status(404).json({
        success: false,
        message: "Leave not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Leave updated successfully",
      data: leave,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Delete leave
export const deleteLeave = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const leave = await Leave.findById(id);

    if (!leave) {
      res.status(404).json({
        success: false,
        message: "Leave not found",
      });
      return;
    }

    await Leave.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Leave deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//approve leave
export const approveLeave = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { remarks } = req.body;

    const leave = await Leave.findById(id);

    if (!leave) {
      res.status(404).json({
        success: false,
        message: "Leave not found",
      });
      return;
    }

    leave.status = "Approved";
    leave.approvedBy = req.user.id;
    leave.remarks = remarks || "";

    await leave.save();

    res.status(200).json({
      success: true,
      message: "Leave approved successfully",
      data: leave,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//reject leave
export const rejectLeave = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { remarks } = req.body;

    const leave = await Leave.findById(id);

    if (!leave) {
      res.status(404).json({
        success: false,
        message: "Leave not found",
      });
      return;
    }

    leave.status = "Rejected";
    leave.approvedBy = req.user.id;
    leave.remarks = remarks || "";

    await leave.save();

    res.status(200).json({
      success: true,
      message: "Leave rejected successfully",
      data: leave,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};