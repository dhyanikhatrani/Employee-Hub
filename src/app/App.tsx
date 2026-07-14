import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "../context/AuthContext";
import HRLayout from "../layouts/HRLayout";
import EmployeeLayout from "../layouts/EmployeeLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import HRDashboard from "../pages/hr/Dashboard";
import Employees from "../pages/hr/Employees";
import Departments from "../pages/hr/Departments";
import Payroll from "../pages/hr/Payroll";
import Leaves from "../pages/hr/Leaves";
import Attendance from "../pages/hr/Attendance";
import Reports from "../pages/hr/Reports";
import HRSettings from "../pages/hr/Settings";
import EmployeeDashboard from "../pages/employee/Dashboard";
import Profile from "../pages/employee/Profile";
import MyAttendance from "../pages/employee/MyAttendance";
import ApplyLeave from "../pages/employee/ApplyLeave";
import LeaveHistory from "../pages/employee/LeaveHistory";
import MyPayroll from "../pages/employee/MyPayroll";
import Notifications from "../pages/employee/Notifications";
import EmployeeSettings from "../pages/employee/EmployeeSettings";

function ProtectedHR({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== "hr") return <Navigate to="/employee/dashboard" replace />;
  return <>{children}</>;
}

function ProtectedEmployee({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== "employee") return <Navigate to="/hr/dashboard" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to={user?.role === "hr" ? "/hr/dashboard" : "/employee/dashboard"} replace /> : <Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/hr" element={<ProtectedHR><HRLayout /></ProtectedHR>}>
        <Route index element={<Navigate to="/hr/dashboard" replace />} />
        <Route path="dashboard" element={<HRDashboard />} />
        <Route path="employees" element={<Employees />} />
        <Route path="departments" element={<Departments />} />
        <Route path="payroll" element={<Payroll />} />
        <Route path="leaves" element={<Leaves />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<HRSettings />} />
      </Route>

      <Route path="/employee" element={<ProtectedEmployee><EmployeeLayout /></ProtectedEmployee>}>
        <Route index element={<Navigate to="/employee/dashboard" replace />} />
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="attendance" element={<MyAttendance />} />
        <Route path="apply-leave" element={<ApplyLeave />} />
        <Route path="leave-history" element={<LeaveHistory />} />
        <Route path="payroll" element={<MyPayroll />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<EmployeeSettings />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </AuthProvider>
  );
}
