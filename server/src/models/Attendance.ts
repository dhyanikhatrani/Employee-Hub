import mongoose, { Schema, Document } from "mongoose";
export interface IAttendance extends Document {
  employeeId: mongoose.Types.ObjectId;
  date: Date;
  checkIn: string;
  checkOut: string;
  totalHours: number;
  status: "Present" | "Absent" | "Half Day" | "Leave";
  remarks?: string;
}
const attendanceSchema = new Schema<IAttendance>(
  {
employeeId: {
  type: Schema.Types.ObjectId,
  ref: "Employee",
  required: true,
},
date: {
  type: Date,
  required: true,
},
checkIn: {
  type: String,
  required: true,
},
checkOut: {
  type: String,
  default: "",
},
totalHours: {
  type: Number,
  default: 0,
},
status: {
  type: String,
  enum: ["Present", "Absent", "Half Day", "Leave"],
  default: "Present",
},
remarks: {
  type: String,
  default: "",
},

  },
  {
    timestamps: true,
  }
);
attendanceSchema.index(
  { employeeId: 1, date: 1 },
  { unique: true }
);
export default mongoose.model<IAttendance>(
  "Attendance",
  attendanceSchema
);
