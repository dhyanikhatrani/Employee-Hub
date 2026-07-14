import { useAuth } from "../../context/AuthContext";
import { mockLeaveBalance, mockHolidays, mockPayroll, mockAttendance, mockLeaveRequests } from "../../data/mockData";
import { CalendarCheck, DollarSign, Calendar, Download, TrendingUp } from "lucide-react";
import Badge from "../../components/ui/Badge";
import { formatCurrency, formatDate, getStatusColor, getLeaveTypeColor } from "../../utils/helpers";

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const myPayroll = mockPayroll.filter(p => p.employeeId === user?.id).slice(0, 3);
  const myLeaves = mockLeaveRequests.filter(l => l.employeeId === user?.id);
  const myAttendance = mockAttendance.filter(a => a.employeeId === user?.id);
  const presentDays = myAttendance.filter(a => a.status === "present" || a.status === "late").length;
  const attendanceRate = myAttendance.length > 0 ? Math.round((presentDays / myAttendance.length) * 100) : 95;

  const nextHoliday = mockHolidays.find(h => new Date(h.date) > new Date());
  const daysUntil = nextHoliday ? Math.ceil((new Date(nextHoliday.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute right-12 bottom-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />
        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-blue-200 text-sm font-medium">Welcome back,</p>
            <h2 className="text-2xl font-bold mt-0.5">{user?.name}</h2>
            <p className="text-blue-200 mt-1">{user?.position} · {user?.department}</p>
            <div className="flex items-center gap-3 mt-4">
              <span className="bg-white/15 px-3 py-1 rounded-full text-sm font-medium">{user?.employeeId}</span>
              <span className="bg-white/15 px-3 py-1 rounded-full text-sm font-medium">
                Since {new Date(user?.joinDate || "").getFullYear()}
              </span>
            </div>
          </div>
          {user?.avatar && (
            <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white/20 hidden sm:block" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Attendance Rate", value: `${attendanceRate}%`, icon: TrendingUp, bg: "bg-blue-100", color: "text-blue-600", sub: "This month" },
          { title: "Leave Balance", value: "12 days", icon: CalendarCheck, bg: "bg-emerald-100", color: "text-emerald-600", sub: "Annual remaining" },
          { title: "Current Salary", value: formatCurrency((user?.salary || 0) / 12), icon: DollarSign, bg: "bg-purple-100", color: "text-purple-600", sub: "Per month (net)" },
          { title: "Next Holiday", value: `${daysUntil}d`, icon: Calendar, bg: "bg-amber-100", color: "text-amber-600", sub: nextHoliday?.name || "—" },
        ].map(card => (
          <div key={card.title} className="bg-card rounded-2xl border border-border p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center mb-3`}>
              <card.icon size={18} className={card.color} />
            </div>
            <p className="text-2xl font-bold text-foreground">{card.value}</p>
            <p className="text-xs font-medium text-foreground mt-0.5">{card.title}</p>
            <p className="text-xs text-muted-foreground">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-5">Leave Balance</h3>
          <div className="space-y-4">
            {mockLeaveBalance.map(lb => {
              const pct = Math.round((lb.remaining / lb.total) * 100);
              const colors: Record<string, string> = { "Annual Leave": "bg-blue-500", "Sick Leave": "bg-red-500", "Casual Leave": "bg-purple-500", "Maternity/Paternity": "bg-pink-500" };
              const color = colors[lb.type] || "bg-blue-500";
              return (
                <div key={lb.type}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-medium text-foreground">{lb.type}</span>
                    <span className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">{lb.remaining}</span> / {lb.total} days</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{lb.used} used · {lb.remaining} remaining</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-foreground">Recent Leave Requests</h3>
            <a href="/employee/apply-leave" className="text-xs text-primary font-medium hover:text-primary/80">+ Apply</a>
          </div>
          {myLeaves.length > 0 ? (
            <div className="space-y-3">
              {myLeaves.map(leave => (
                <div key={leave.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors">
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${leave.status === "approved" ? "bg-emerald-500" : leave.status === "rejected" ? "bg-red-500" : "bg-amber-500"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge label={leave.leaveType} className={getLeaveTypeColor(leave.leaveType)} />
                      <span className="text-xs text-muted-foreground">{leave.days}d</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{formatDate(leave.startDate)} → {formatDate(leave.endDate)}</p>
                  </div>
                  <Badge label={leave.status} className={getStatusColor(leave.status)} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No leave requests yet</p>
          )}
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <h3 className="font-semibold text-foreground mb-5">Recent Payslips</h3>
        {myPayroll.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left pb-3 text-xs font-semibold text-muted-foreground uppercase">Period</th>
                  <th className="text-right pb-3 text-xs font-semibold text-muted-foreground uppercase hidden sm:table-cell">Basic</th>
                  <th className="text-right pb-3 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Allowances</th>
                  <th className="text-right pb-3 text-xs font-semibold text-muted-foreground uppercase">Net Pay</th>
                  <th className="text-center pb-3 text-xs font-semibold text-muted-foreground uppercase">Download</th>
                </tr>
              </thead>
              <tbody>
                {myPayroll.map(p => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="py-3">
                      <p className="text-sm font-medium text-foreground">{p.month} {p.year}</p>
                    </td>
                    <td className="py-3 text-right hidden sm:table-cell text-sm text-muted-foreground">{formatCurrency(p.basicSalary)}</td>
                    <td className="py-3 text-right hidden md:table-cell text-sm text-emerald-600">+{formatCurrency(p.allowances)}</td>
                    <td className="py-3 text-right text-sm font-bold text-foreground">{formatCurrency(p.netSalary)}</td>
                    <td className="py-3 text-center">
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-muted-foreground hover:text-blue-600 transition-colors">
                        <Download size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No payslip records found</p>
        )}
      </div>
    </div>
  );
}
