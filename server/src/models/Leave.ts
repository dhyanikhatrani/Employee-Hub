import mongoose, { Schema, Document } from "mongoose";
export interface ILeave extends Document {
  employeeId: mongoose.Types.ObjectId;
  leaveType: "Casual" | "Sick" | "Paid" | "Unpaid";
  startDate: Date;
  endDate: Date;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  approvedBy?: mongoose.Types.ObjectId;
  remarks?: string;
}
const leaveSchema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    leaveType: {
      type: String,
      enum: ["Casual", "Sick", "Paid", "Unpaid"],
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    reason: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
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
export default mongoose.model<ILeave>("Leave", leaveSchema);