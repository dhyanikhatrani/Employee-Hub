import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
  userId: mongoose.Types.ObjectId;
  employeeId: string;
  phone: string;
  address: string;
  department: string;
  designation: string;
 
  joiningDate: Date;
  profileImage?: string;
  gender: "Male" | "Female" | "Other";
  dateOfBirth: Date;
  emergencyContact: string;
  status: "Active" | "Inactive";
}

const employeeSchema = new Schema<IEmployee>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    employeeId: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },


    joiningDate: {
      type: Date,
      required: true,
    },

    profileImage: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    emergencyContact: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model<IEmployee>("Employee", employeeSchema);

export default Employee;