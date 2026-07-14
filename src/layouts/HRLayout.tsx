import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Outlet } from "react-router";
import Sidebar from "../components/layout/Sidebar";
import TopNav from "../components/layout/TopNav";

const pageTitles: Record<string, string> = {
  "/hr/dashboard": "Dashboard",
  "/hr/employees": "Employee Management",
  "/hr/departments": "Departments",
  "/hr/payroll": "Payroll Management",
  "/hr/leaves": "Leave Requests",
  "/hr/attendance": "Attendance",
  "/hr/reports": "Reports",
  "/hr/settings": "Settings",
};

export default function HRLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] || "HR Dashboard";

  useEffect(() => { setSidebarOpen(false); }, [location]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar role="hr" collapsed={!sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav onMenuToggle={() => setSidebarOpen(true)} title={title} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
