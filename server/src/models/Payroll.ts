import mongoose, { Schema, Document } from "mongoose";

export interface IPayroll extends Document {
  employeeId: mongoose.Types.ObjectId;
  month: string;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  paymentStatus: "Pending" | "Paid";
  paymentDate?: Date;
}

const payrollSchema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    month: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    basicSalary: {
      type: Number,
      required: true,
    },

    allowances: {
      type: Number,
      default: 0,
    },

    deductions: {
      type: Number,
      default: 0,
    },

    netSalary: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },

    paymentDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPayroll>("Payroll", payrollSchema);