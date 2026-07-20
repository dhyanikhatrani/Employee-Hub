import { Request, Response } from "express";
import Attendance from "../models/Attendance";
import Employee from "../models/Employee";

export const createAttendance = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
  employeeId,
  date,
  checkIn,
  checkOut,
  totalHours,
  status,
  remarks,
} = req.body;

const employee = await Employee.findById(employeeId);

if (!employee) {
  res.status(404).json({
    success: false,
    message: "Employee not found",
  });
  return;
}
const existingAttendance = await Attendance.findOne({
  employeeId,
  date,
});

if (existingAttendance) {
  res.status(400).json({
    success: false,
    message: "Attendance already marked for this date",
  });
  return;
}
const attendance = await Attendance.create({
  employeeId,
  date,
  checkIn,
  checkOut,
  totalHours,
  status,
  remarks,
});
res.status(201).json({
  success: true,
  message: "Attendance marked successfully",
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
//get all attendance records
export const getAllAttendance = async (
  req: Request,
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
  });
  res.status(200).json({
  success: true,
  count: attendance.length,
  data: attendance,
});
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