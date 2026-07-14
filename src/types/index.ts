export type UserRole = "hr" | "employee";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  position: string;
  avatar: string;
  joinDate: string;
  employeeId: string;
  phone: string;
  address: string;
  emergencyContact: { name: string; phone: string; relationship: string };
  salary: number;
  status: "active" | "inactive" | "onleave";
}

export interface Department {
  id: string;
  name: string;
  head: string;
  headAvatar: string;
  totalEmployees: number;
  description: string;
  createdAt: string;
  budget: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  department: string;
  leaveType: "annual" | "sick" | "casual" | "maternity" | "paternity" | "unpaid";
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  appliedOn: string;
  approvedBy?: string;
}

export interface Payroll {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  position: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  month: string;
  year: number;
  status: "paid" | "pending" | "processing";
  payDate: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  date: string;
  checkIn: string;
  checkOut: string;
  hoursWorked: number;
  status: "present" | "absent" | "late" | "half-day" | "holiday";
}

export interface Activity {
  id: string;
  type: "leave" | "payroll" | "employee" | "department" | "attendance";
  message: string;
  time: string;
  user: string;
  avatar: string;
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
  type: "public" | "company";
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
}

export interface LeaveBalance {
  type: string;
  total: number;
  used: number;
  remaining: number;
}

export interface ChartData {
  name: string;
  value: number;
  fill?: string;
}

export interface MonthlyData {
  month: string;
  employees: number;
  payroll: number;
  leaves: number;
}
