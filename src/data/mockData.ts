import type { User, Department, LeaveRequest, Payroll, AttendanceRecord, Activity, Holiday, Notification, LeaveBalance, MonthlyData } from "../types";

export const mockUsers: User[] = [
  {
    id: "1", name: "Sarah Mitchell", email: "sarah.mitchell@acmecorp.com", role: "hr",
    department: "Human Resources", position: "HR Director",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&auto=format",
    joinDate: "2019-03-15", employeeId: "EMP001", phone: "+1 (555) 234-5678",
    address: "123 Corporate Ave, San Francisco, CA 94102",
    emergencyContact: { name: "David Mitchell", phone: "+1 (555) 234-9999", relationship: "Spouse" },
    salary: 125000, status: "active"
  },
  {
    id: "2", name: "Marcus Chen", email: "marcus.chen@acmecorp.com", role: "employee",
    department: "Engineering", position: "Senior Software Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&auto=format",
    joinDate: "2021-06-01", employeeId: "EMP002", phone: "+1 (555) 345-6789",
    address: "456 Tech Blvd, San Francisco, CA 94105",
    emergencyContact: { name: "Linda Chen", phone: "+1 (555) 345-0000", relationship: "Mother" },
    salary: 98000, status: "active"
  },
  {
    id: "3", name: "Priya Patel", email: "priya.patel@acmecorp.com", role: "employee",
    department: "Product", position: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&auto=format",
    joinDate: "2020-09-10", employeeId: "EMP003", phone: "+1 (555) 456-7890",
    address: "789 Market St, San Francisco, CA 94103",
    emergencyContact: { name: "Raj Patel", phone: "+1 (555) 456-1111", relationship: "Father" },
    salary: 110000, status: "active"
  },
  {
    id: "4", name: "James Okonkwo", email: "james.okonkwo@acmecorp.com", role: "employee",
    department: "Finance", position: "Financial Analyst",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&auto=format",
    joinDate: "2022-01-20", employeeId: "EMP004", phone: "+1 (555) 567-8901",
    address: "321 Financial Rd, San Francisco, CA 94104",
    emergencyContact: { name: "Amara Okonkwo", phone: "+1 (555) 567-2222", relationship: "Spouse" },
    salary: 85000, status: "active"
  },
  {
    id: "5", name: "Elena Vasquez", email: "elena.vasquez@acmecorp.com", role: "employee",
    department: "Marketing", position: "Marketing Lead",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&auto=format",
    joinDate: "2020-04-05", employeeId: "EMP005", phone: "+1 (555) 678-9012",
    address: "654 Creative Ln, San Francisco, CA 94107",
    emergencyContact: { name: "Carlos Vasquez", phone: "+1 (555) 678-3333", relationship: "Spouse" },
    salary: 92000, status: "active"
  },
  {
    id: "6", name: "Tom Harrison", email: "tom.harrison@acmecorp.com", role: "employee",
    department: "Engineering", position: "DevOps Engineer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&auto=format",
    joinDate: "2021-11-30", employeeId: "EMP006", phone: "+1 (555) 789-0123",
    address: "987 Server St, San Francisco, CA 94110",
    emergencyContact: { name: "Mary Harrison", phone: "+1 (555) 789-4444", relationship: "Mother" },
    salary: 95000, status: "active"
  },
  {
    id: "7", name: "Aisha Johnson", email: "aisha.johnson@acmecorp.com", role: "employee",
    department: "Design", position: "UX Designer",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&auto=format",
    joinDate: "2022-07-14", employeeId: "EMP007", phone: "+1 (555) 890-1234",
    address: "147 Design Ave, San Francisco, CA 94108",
    emergencyContact: { name: "Michael Johnson", phone: "+1 (555) 890-5555", relationship: "Father" },
    salary: 88000, status: "onleave"
  },
  {
    id: "8", name: "Ryan Park", email: "ryan.park@acmecorp.com", role: "employee",
    department: "Sales", position: "Account Executive",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&auto=format",
    joinDate: "2023-02-01", employeeId: "EMP008", phone: "+1 (555) 901-2345",
    address: "258 Sales Blvd, San Francisco, CA 94109",
    emergencyContact: { name: "Lisa Park", phone: "+1 (555) 901-6666", relationship: "Spouse" },
    salary: 75000, status: "active"
  },
];

export const mockDepartments: Department[] = [
  { id: "1", name: "Engineering", head: "Alex Torres", headAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&auto=format", totalEmployees: 24, description: "Software development and infrastructure", createdAt: "2015-01-10", budget: 2400000 },
  { id: "2", name: "Human Resources", head: "Sarah Mitchell", headAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&auto=format", totalEmployees: 8, description: "People operations and talent management", createdAt: "2015-01-10", budget: 480000 },
  { id: "3", name: "Finance", head: "Robert Kim", headAvatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&auto=format", totalEmployees: 12, description: "Financial planning, accounting and reporting", createdAt: "2015-03-20", budget: 960000 },
  { id: "4", name: "Marketing", head: "Elena Vasquez", headAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&auto=format", totalEmployees: 15, description: "Brand, digital marketing and growth", createdAt: "2016-06-01", budget: 1200000 },
  { id: "5", name: "Product", head: "Priya Patel", headAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&auto=format", totalEmployees: 10, description: "Product strategy and roadmap", createdAt: "2017-09-15", budget: 800000 },
  { id: "6", name: "Design", head: "Aisha Johnson", headAvatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&auto=format", totalEmployees: 9, description: "UX/UI design and brand identity", createdAt: "2017-11-01", budget: 720000 },
  { id: "7", name: "Sales", head: "Daniel Cross", headAvatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&h=150&fit=crop&auto=format", totalEmployees: 20, description: "Enterprise sales and partnerships", createdAt: "2016-02-14", budget: 1600000 },
  { id: "8", name: "Operations", head: "Nina Wallace", headAvatar: "https://images.unsplash.com/photo-1601412436965-e3bb787e5c91?w=150&h=150&fit=crop&auto=format", totalEmployees: 11, description: "Business operations and process management", createdAt: "2018-04-20", budget: 880000 },
];

export const mockLeaveRequests: LeaveRequest[] = [
  { id: "L001", employeeId: "7", employeeName: "Aisha Johnson", employeeAvatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&auto=format", department: "Design", leaveType: "annual", startDate: "2025-07-14", endDate: "2025-07-18", days: 5, reason: "Family vacation to Hawaii", status: "approved", appliedOn: "2025-07-01", approvedBy: "Sarah Mitchell" },
  { id: "L002", employeeId: "2", employeeName: "Marcus Chen", employeeAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&auto=format", department: "Engineering", leaveType: "sick", startDate: "2025-07-10", endDate: "2025-07-11", days: 2, reason: "Seasonal flu and fever", status: "approved", appliedOn: "2025-07-10", approvedBy: "Sarah Mitchell" },
  { id: "L003", employeeId: "4", employeeName: "James Okonkwo", employeeAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&auto=format", department: "Finance", leaveType: "casual", startDate: "2025-07-20", endDate: "2025-07-21", days: 2, reason: "Personal errand - home renovation", status: "pending", appliedOn: "2025-07-08" },
  { id: "L004", employeeId: "5", employeeName: "Elena Vasquez", employeeAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&auto=format", department: "Marketing", leaveType: "annual", startDate: "2025-08-01", endDate: "2025-08-05", days: 5, reason: "Summer vacation", status: "pending", appliedOn: "2025-07-09" },
  { id: "L005", employeeId: "8", employeeName: "Ryan Park", employeeAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&auto=format", department: "Sales", leaveType: "sick", startDate: "2025-07-07", endDate: "2025-07-07", days: 1, reason: "Medical appointment", status: "approved", appliedOn: "2025-07-06", approvedBy: "Sarah Mitchell" },
  { id: "L006", employeeId: "3", employeeName: "Priya Patel", employeeAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&auto=format", department: "Product", leaveType: "casual", startDate: "2025-07-25", endDate: "2025-07-25", days: 1, reason: "Personal work", status: "rejected", appliedOn: "2025-07-05" },
  { id: "L007", employeeId: "6", employeeName: "Tom Harrison", employeeAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&auto=format", department: "Engineering", leaveType: "annual", startDate: "2025-08-11", endDate: "2025-08-15", days: 5, reason: "Annual family trip", status: "pending", appliedOn: "2025-07-12" },
];

export const mockPayroll: Payroll[] = [
  { id: "P001", employeeId: "2", employeeName: "Marcus Chen", department: "Engineering", position: "Senior Software Engineer", basicSalary: 8166, allowances: 1200, deductions: 980, netSalary: 8386, month: "June", year: 2025, status: "paid", payDate: "2025-06-30" },
  { id: "P002", employeeId: "3", employeeName: "Priya Patel", department: "Product", position: "Product Manager", basicSalary: 9166, allowances: 1400, deductions: 1100, netSalary: 9466, month: "June", year: 2025, status: "paid", payDate: "2025-06-30" },
  { id: "P003", employeeId: "4", employeeName: "James Okonkwo", department: "Finance", position: "Financial Analyst", basicSalary: 7083, allowances: 900, deductions: 850, netSalary: 7133, month: "June", year: 2025, status: "paid", payDate: "2025-06-30" },
  { id: "P004", employeeId: "5", employeeName: "Elena Vasquez", department: "Marketing", position: "Marketing Lead", basicSalary: 7666, allowances: 1100, deductions: 920, netSalary: 7846, month: "June", year: 2025, status: "paid", payDate: "2025-06-30" },
  { id: "P005", employeeId: "6", employeeName: "Tom Harrison", department: "Engineering", position: "DevOps Engineer", basicSalary: 7916, allowances: 1000, deductions: 950, netSalary: 7966, month: "June", year: 2025, status: "paid", payDate: "2025-06-30" },
  { id: "P006", employeeId: "7", employeeName: "Aisha Johnson", department: "Design", position: "UX Designer", basicSalary: 7333, allowances: 900, deductions: 880, netSalary: 7353, month: "June", year: 2025, status: "paid", payDate: "2025-06-30" },
  { id: "P007", employeeId: "8", employeeName: "Ryan Park", department: "Sales", position: "Account Executive", basicSalary: 6250, allowances: 2500, deductions: 750, netSalary: 8000, month: "June", year: 2025, status: "paid", payDate: "2025-06-30" },
  { id: "P008", employeeId: "2", employeeName: "Marcus Chen", department: "Engineering", position: "Senior Software Engineer", basicSalary: 8166, allowances: 1200, deductions: 980, netSalary: 8386, month: "July", year: 2025, status: "processing", payDate: "2025-07-31" },
  { id: "P009", employeeId: "3", employeeName: "Priya Patel", department: "Product", position: "Product Manager", basicSalary: 9166, allowances: 1400, deductions: 1100, netSalary: 9466, month: "July", year: 2025, status: "pending", payDate: "2025-07-31" },
];

export const mockAttendance: AttendanceRecord[] = [
  { id: "A001", employeeId: "2", employeeName: "Marcus Chen", department: "Engineering", date: "2025-07-14", checkIn: "08:52", checkOut: "17:30", hoursWorked: 8.6, status: "present" },
  { id: "A002", employeeId: "3", employeeName: "Priya Patel", department: "Product", date: "2025-07-14", checkIn: "09:10", checkOut: "18:00", hoursWorked: 8.8, status: "present" },
  { id: "A003", employeeId: "4", employeeName: "James Okonkwo", department: "Finance", date: "2025-07-14", checkIn: "09:45", checkOut: "17:15", hoursWorked: 7.5, status: "late" },
  { id: "A004", employeeId: "5", employeeName: "Elena Vasquez", department: "Marketing", date: "2025-07-14", checkIn: "08:30", checkOut: "17:00", hoursWorked: 8.5, status: "present" },
  { id: "A005", employeeId: "6", employeeName: "Tom Harrison", department: "Engineering", date: "2025-07-14", checkIn: "08:00", checkOut: "17:00", hoursWorked: 9.0, status: "present" },
  { id: "A006", employeeId: "7", employeeName: "Aisha Johnson", department: "Design", date: "2025-07-14", checkIn: "", checkOut: "", hoursWorked: 0, status: "absent" },
  { id: "A007", employeeId: "8", employeeName: "Ryan Park", department: "Sales", date: "2025-07-14", checkIn: "09:00", checkOut: "13:00", hoursWorked: 4.0, status: "half-day" },
  { id: "A008", employeeId: "2", employeeName: "Marcus Chen", department: "Engineering", date: "2025-07-13", checkIn: "08:55", checkOut: "17:30", hoursWorked: 8.6, status: "present" },
  { id: "A009", employeeId: "3", employeeName: "Priya Patel", department: "Product", date: "2025-07-13", checkIn: "09:00", checkOut: "18:15", hoursWorked: 9.2, status: "present" },
  { id: "A010", employeeId: "4", employeeName: "James Okonkwo", department: "Finance", date: "2025-07-13", checkIn: "09:00", checkOut: "17:30", hoursWorked: 8.5, status: "present" },
];

export const mockActivities: Activity[] = [
  { id: "1", type: "leave", message: "Aisha Johnson's annual leave request approved for Jul 14-18", time: "2 hours ago", user: "Sarah Mitchell", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&auto=format" },
  { id: "2", type: "employee", message: "Ryan Park joined the Sales department as Account Executive", time: "Yesterday", user: "Sarah Mitchell", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&auto=format" },
  { id: "3", type: "payroll", message: "June 2025 payroll processed — $58,150 total disbursed", time: "3 days ago", user: "System", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&auto=format" },
  { id: "4", type: "leave", message: "James Okonkwo submitted a casual leave request for Jul 20-21", time: "5 days ago", user: "James Okonkwo", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&auto=format" },
  { id: "5", type: "department", message: "Operations department budget updated for Q3 2025", time: "1 week ago", user: "Sarah Mitchell", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&auto=format" },
];

export const mockHolidays: Holiday[] = [
  { id: "1", name: "Independence Day", date: "2025-07-04", type: "public" },
  { id: "2", name: "Labor Day", date: "2025-09-01", type: "public" },
  { id: "3", name: "Thanksgiving Day", date: "2025-11-27", type: "public" },
  { id: "4", name: "Christmas Day", date: "2025-12-25", type: "public" },
  { id: "5", name: "Company Foundation Day", date: "2025-08-15", type: "company" },
  { id: "6", name: "Year-End Celebration", date: "2025-12-31", type: "company" },
];

export const mockNotifications: Notification[] = [
  { id: "1", title: "Leave Approved", message: "Your annual leave request for Jul 14-18 has been approved", time: "2 hours ago", read: false, type: "success" },
  { id: "2", title: "Payslip Available", message: "Your June 2025 payslip is now available for download", time: "3 days ago", read: false, type: "info" },
  { id: "3", title: "Attendance Reminder", message: "You clocked in late on July 13. Please ensure timely check-ins", time: "Yesterday", read: true, type: "warning" },
  { id: "4", title: "Team Meeting", message: "All-hands meeting scheduled for July 18 at 10:00 AM", time: "4 days ago", read: true, type: "info" },
  { id: "5", title: "Performance Review", message: "Your mid-year performance review is scheduled for July 25", time: "1 week ago", read: true, type: "info" },
];

export const mockLeaveBalance: LeaveBalance[] = [
  { type: "Annual Leave", total: 20, used: 8, remaining: 12 },
  { type: "Sick Leave", total: 12, used: 3, remaining: 9 },
  { type: "Casual Leave", total: 6, used: 2, remaining: 4 },
  { type: "Maternity/Paternity", total: 90, used: 0, remaining: 90 },
];

export const monthlyData: MonthlyData[] = [
  { month: "Jan", employees: 98, payroll: 520000, leaves: 18 },
  { month: "Feb", employees: 101, payroll: 535000, leaves: 22 },
  { month: "Mar", employees: 103, payroll: 548000, leaves: 15 },
  { month: "Apr", employees: 105, payroll: 556000, leaves: 31 },
  { month: "May", employees: 107, payroll: 562000, leaves: 28 },
  { month: "Jun", employees: 109, payroll: 574000, leaves: 19 },
  { month: "Jul", employees: 109, payroll: 578000, leaves: 24 },
];

export const departmentHeadcountData = [
  { name: "Engineering", value: 24, fill: "#2563eb" },
  { name: "Sales", value: 20, fill: "#7c3aed" },
  { name: "Marketing", value: 15, fill: "#059669" },
  { name: "Finance", value: 12, fill: "#d97706" },
  { name: "Operations", value: 11, fill: "#dc2626" },
  { name: "Product", value: 10, fill: "#0891b2" },
  { name: "Design", value: 9, fill: "#c026d3" },
  { name: "HR", value: 8, fill: "#65a30d" },
];

export const currentUser = mockUsers[1];
export const currentHRUser = mockUsers[0];
