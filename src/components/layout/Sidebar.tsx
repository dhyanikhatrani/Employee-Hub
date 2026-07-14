import { Link, useLocation } from "react-router";
import { LayoutDashboard, Users, Building2, Banknote, CalendarCheck, Clock, BarChart3, Settings, UserCircle, CalendarPlus, Calendar, Bell, LogOut, ChevronRight, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getInitials } from "../../utils/helpers";

interface SidebarProps {
  role: "hr" | "employee";
  collapsed: boolean;
  onClose: () => void;
}

const hrNavItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/hr/dashboard" },
  { label: "Employees", icon: Users, path: "/hr/employees" },
  { label: "Departments", icon: Building2, path: "/hr/departments" },
  { label: "Payroll", icon: Banknote, path: "/hr/payroll" },
  { label: "Leave Requests", icon: CalendarCheck, path: "/hr/leaves" },
  { label: "Attendance", icon: Clock, path: "/hr/attendance" },
  { label: "Reports", icon: BarChart3, path: "/hr/reports" },
  { label: "Settings", icon: Settings, path: "/hr/settings" },
];

const employeeNavItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/employee/dashboard" },
  { label: "My Profile", icon: UserCircle, path: "/employee/profile" },
  { label: "Attendance", icon: Clock, path: "/employee/attendance" },
  { label: "Apply Leave", icon: CalendarPlus, path: "/employee/apply-leave" },
  { label: "Leave History", icon: Calendar, path: "/employee/leave-history" },
  { label: "My Payroll", icon: Banknote, path: "/employee/payroll" },
  { label: "Notifications", icon: Bell, path: "/employee/notifications" },
  { label: "Settings", icon: Settings, path: "/employee/settings" },
];

export default function Sidebar({ role, collapsed, onClose }: SidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navItems = role === "hr" ? hrNavItems : employeeNavItems;

  return (
    <>
      {!collapsed && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`fixed top-0 left-0 h-full z-50 flex flex-col bg-[#1e293b] transition-transform duration-300 ease-in-out
        ${collapsed ? "-translate-x-full" : "translate-x-0"} lg:translate-x-0 lg:static lg:z-auto w-64 shrink-0`}>

        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <span className="text-white font-semibold text-base tracking-tight">AcmeCorp</span>
              <p className="text-slate-400 text-xs">HRMS Platform</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white p-1 rounded">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            {role === "hr" ? "HR Administration" : "Employee Portal"}
          </span>
        </div>

        <nav className="flex-1 px-3 pb-4 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-all duration-150
                  ${active
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-900/30"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.08]"
                  }`}
              >
                <item.icon size={18} className={active ? "text-white" : "text-slate-500"} />
                <span className="flex-1">{item.label}</span>
                {active && <ChevronRight size={14} className="text-white/60" />}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 mb-3">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/30" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                {user ? getInitials(user.name) : "U"}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user?.name}</p>
              <p className="text-slate-400 text-xs truncate">{user?.position}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 text-sm transition-colors"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
