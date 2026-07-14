import { useState } from "react";
import { Download, DollarSign, CheckCircle, Clock, TrendingUp, ChevronDown } from "lucide-react";
import { mockPayroll } from "../../data/mockData";
import Badge from "../../components/ui/Badge";
import Pagination from "../../components/ui/Pagination";
import { getStatusColor, formatCurrency } from "../../utils/helpers";

export default function Payroll() {
  const [monthFilter, setMonthFilter] = useState("All");
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  const filtered = monthFilter === "All" ? mockPayroll : mockPayroll.filter(p => p.month === monthFilter);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const totalPaid = mockPayroll.filter(p => p.status === "paid").reduce((acc, p) => acc + p.netSalary, 0);
  const pending = mockPayroll.filter(p => p.status === "pending").length;
  const avgSalary = Math.round(mockPayroll.reduce((acc, p) => acc + p.netSalary, 0) / mockPayroll.length);

  const stats = [
    { label: "Total Payroll (Jun)", value: formatCurrency(totalPaid), icon: DollarSign, bg: "bg-blue-100", color: "text-blue-600" },
    { label: "Paid This Month", value: mockPayroll.filter(p => p.status === "paid").length.toString(), icon: CheckCircle, bg: "bg-emerald-100", color: "text-emerald-600" },
    { label: "Pending Payments", value: pending.toString(), icon: Clock, bg: "bg-amber-100", color: "text-amber-600" },
    { label: "Average Net Salary", value: formatCurrency(avgSalary), icon: TrendingUp, bg: "bg-purple-100", color: "text-purple-600" },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Payroll Management</h2>
          <p className="text-sm text-muted-foreground">July 2025 payroll cycle</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90">
          <Download size={16} /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map(({ label, value, icon: Icon, bg, color }) => (
          <div key={label} className="bg-card rounded-2xl border border-border p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon size={18} className={color} />
            </div>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between bg-card rounded-2xl border border-border p-4 shadow-sm">
        <p className="text-sm font-medium text-foreground">{filtered.length} payroll records</p>
        <div className="relative">
          <select
            value={monthFilter}
            onChange={e => { setMonthFilter(e.target.value); setPage(1); }}
            className="appearance-none pl-4 pr-8 py-2 rounded-xl border border-border bg-muted/30 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
          >
            <option value="All">All Months</option>
            <option>June</option>
            <option>July</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Employee</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">Department</th>
                <th className="text-right py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell">Basic</th>
                <th className="text-right py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell">Allowances</th>
                <th className="text-right py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell">Deductions</th>
                <th className="text-right py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Net Salary</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">Status</th>
                <th className="text-center py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(p => (
                <tr key={p.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="py-4 px-5">
                    <p className="text-sm font-medium text-foreground">{p.employeeName}</p>
                    <p className="text-xs text-muted-foreground">{p.position}</p>
                  </td>
                  <td className="py-4 px-5 hidden md:table-cell">
                    <span className="text-sm text-muted-foreground">{p.department}</span>
                  </td>
                  <td className="py-4 px-5 text-right hidden lg:table-cell">
                    <span className="text-sm text-foreground">{formatCurrency(p.basicSalary)}</span>
                  </td>
                  <td className="py-4 px-5 text-right hidden lg:table-cell">
                    <span className="text-sm text-emerald-600">+{formatCurrency(p.allowances)}</span>
                  </td>
                  <td className="py-4 px-5 text-right hidden lg:table-cell">
                    <span className="text-sm text-red-500">-{formatCurrency(p.deductions)}</span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <span className="text-sm font-bold text-foreground">{formatCurrency(p.netSalary)}</span>
                  </td>
                  <td className="py-4 px-5 hidden sm:table-cell">
                    <Badge label={p.status} className={getStatusColor(p.status)} />
                  </td>
                  <td className="py-4 px-5 text-center">
                    <button className="p-2 rounded-lg hover:bg-blue-50 text-muted-foreground hover:text-blue-600 transition-colors">
                      <Download size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-border">
          <Pagination currentPage={page} totalPages={Math.max(1, Math.ceil(filtered.length / PER_PAGE))} onPageChange={setPage} totalItems={filtered.length} itemsPerPage={PER_PAGE} />
        </div>
      </div>
    </div>
  );
}
