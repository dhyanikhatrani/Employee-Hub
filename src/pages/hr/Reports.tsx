import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";
import { monthlyData } from "../../data/mockData";

export default function Reports() {
  const payrollData = monthlyData.map(d => ({ ...d, payroll: d.payroll / 1000 }));

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Reports & Analytics</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-1">Monthly Payroll Trend</h3>
          <p className="text-xs text-muted-foreground mb-5">Total payroll disbursement (in thousands $)</p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={payrollData}>
              <defs>
                <linearGradient id="payrollGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} formatter={(v: number) => [`$${v}K`, "Payroll"]} />
              <Area type="monotone" dataKey="payroll" stroke="#2563eb" strokeWidth={2} fill="url(#payrollGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-1">Leave Requests Over Time</h3>
          <p className="text-xs text-muted-foreground mb-5">Monthly leave request volume</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyData} barSize={26}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="leaves" fill="#7c3aed" radius={[6, 6, 0, 0]} name="Leave Requests" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="xl:col-span-2 bg-card rounded-2xl border border-border p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-1">Headcount & Payroll Correlation</h3>
          <p className="text-xs text-muted-foreground mb-5">Employee growth vs payroll expenditure</p>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} domain={[90, 115]} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              <Line yAxisId="left" type="monotone" dataKey="employees" stroke="#2563eb" strokeWidth={2} dot={{ fill: "#2563eb", r: 4 }} name="Employees" />
              <Line yAxisId="right" type="monotone" dataKey="payroll" stroke="#059669" strokeWidth={2} dot={{ fill: "#059669", r: 4 }} name="Payroll ($)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
