import { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router";
import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";

const pageTitles: Record<string, string> = {
  "/employee/dashboard": "My Dashboard",
  "/employee/profile": "My Profile",
  "/employee/attendance": "My Attendance",
  "/employee/apply-leave": "Apply for Leave",
  "/employee/leave-history": "Leave History",
  "/employee/payroll": "My Payroll",
  "/employee/notifications": "Notifications",
  "/employee/settings": "Settings",
};

export default function EmployeeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Employee Portal";

  useEffect(() => { setSidebarOpen(false); }, [location]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar role="employee" collapsed={!sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav onMenuToggle={() => setSidebarOpen(true)} title={title} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
