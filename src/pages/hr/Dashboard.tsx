import { Users, Building2, CalendarCheck, DollarSign, TrendingUp, UserPlus, Banknote, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import StatCard from "../../components/ui/StatCard";
import { monthlyData, mockActivities, mockHolidays, departmentHeadcountData } from "../../data/mockData";
import { formatDate, getLeaveTypeColor } from "../../utils/helpers";

export default function HRDashboard() {
  const quickActions = [
    { icon: UserPlus, label: "Add Employee", bg: "bg-blue-50 hover:bg-blue-100", color: "text-blue-600" },
    { icon: Banknote, label: "Run Payroll", bg: "bg-emerald-50 hover:bg-emerald-100", color: "text-emerald-600" },
    { icon: CalendarCheck, label: "Review Leaves", bg: "bg-amber-50 hover:bg-amber-100", color: "text-amber-600" },
    { icon: Clock, label: "Attendance", bg: "bg-purple-50 hover:bg-purple-100", color: "text-purple-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Good morning, Sarah 👋</h2>
        <p className="text-muted-foreground mt-1">{"Here's what's happening at AcmeCorp today"}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Employees" value="109" subtitle="Across 8 departments" icon={Users} iconBg="bg-blue-100" iconColor="text-blue-600" trend={{ value: 2.8, positive: true }} />
        <StatCard title="Departments" value="8" subtitle="All fully staffed" icon={Building2} iconBg="bg-indigo-100" iconColor="text-indigo-600" />
        <StatCard title="Pending Leaves" value="3" subtitle="Awaiting approval" icon={CalendarCheck} iconBg="bg-amber-100" iconColor="text-amber-600" trend={{ value: 12, positive: false }} />
        <StatCard title="Monthly Payroll" value="$578K" subtitle="July 2025 projection" icon={DollarSign} iconBg="bg-emerald-100" iconColor="text-emerald-600" trend={{ value: 0.7, positive: true }} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-card rounded-2xl border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground">Headcount Trend</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Monthly employee count — 2025</p>
            </div>
            <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-medium">
              <TrendingUp size={12} /> +11.2% YTD
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} domain={[90, 115]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", fontSize: 12 }} />
              <Bar dataKey="employees" fill="#2563eb" radius={[6, 6, 0, 0]} name="Employees" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-1">By Department</h3>
          <p className="text-xs text-muted-foreground mb-4">Headcount distribution</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={departmentHeadcountData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={2} dataKey="value">
                {departmentHeadcountData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {departmentHeadcountData.slice(0, 4).map(d => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.fill }} />
                  <span className="text-muted-foreground">{d.name}</span>
                </div>
                <span className="font-medium text-foreground">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {quickActions.map(({ icon: Icon, label, bg, color }) => (
          <button key={label} className={`${bg} flex items-center gap-3 p-4 rounded-2xl transition-colors`}>
            <Icon size={20} className={color} />
            <span className={`text-sm font-medium ${color}`}>{label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-5">Recent Activities</h3>
          <div className="space-y-4">
            {mockActivities.map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <img src={activity.avatar} alt={activity.user} className="w-9 h-9 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground leading-snug">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                </div>
                <span className={`shrink-0 text-xs px-2.5 py-0.5 rounded-full font-medium h-fit ${getLeaveTypeColor(activity.type)}`}>
                  {activity.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-5">Upcoming Holidays</h3>
          <div className="space-y-3">
            {mockHolidays.map((holiday) => {
              const d = new Date(holiday.date);
              return (
                <div key={holiday.id} className="flex items-center gap-4 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-white border border-border flex flex-col items-center justify-center shrink-0 shadow-sm">
                    <span className="text-xs text-muted-foreground font-medium uppercase">{d.toLocaleString("en-US", { month: "short" })}</span>
                    <span className="text-lg font-bold text-foreground leading-none">{d.getDate()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{holiday.name}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(holiday.date)}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${holiday.type === "public" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>
                    {holiday.type}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
