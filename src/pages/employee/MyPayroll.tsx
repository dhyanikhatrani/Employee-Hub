import { useAuth } from "../../context/AuthContext";
import { mockPayroll } from "../../data/mockData";
import Badge from "../../components/ui/Badge";
import { getStatusColor, formatCurrency } from "../../utils/helpers";
import { Download } from "lucide-react";
import { toast } from "sonner";

export default function MyPayroll() {
  const { user } = useAuth();
  const myPayroll = mockPayroll.filter(p => p.employeeId === user?.id);
  const latestPay = myPayroll[0];

  const handleDownload = (month: string, year: number) => {
    toast.success(`Downloading payslip for ${month} ${year}`);
  };

  return (
    <div className="max-w-4xl space-y-5">
      <h2 className="text-xl font-bold text-foreground">My Payroll</h2>

      {latestPay && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
          <p className="text-blue-200 text-sm">Latest Net Salary</p>
          <p className="text-4xl font-bold mt-1">{formatCurrency(latestPay.netSalary)}</p>
          <p className="text-blue-200 text-sm mt-1">{latestPay.month} {latestPay.year}</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: "Basic", value: formatCurrency(latestPay.basicSalary) },
              { label: "Allowances", value: `+${formatCurrency(latestPay.allowances)}` },
              { label: "Deductions", value: `-${formatCurrency(latestPay.deductions)}` },
            ].map(item => (
              <div key={item.label} className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-lg font-bold">{item.value}</p>
                <p className="text-blue-200 text-xs mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Payslip History</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase">Period</th>
              <th className="text-right py-4 px-5 text-xs font-semibold text-muted-foreground uppercase hidden sm:table-cell">Basic</th>
              <th className="text-right py-4 px-5 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Allowances</th>
              <th className="text-right py-4 px-5 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Deductions</th>
              <th className="text-right py-4 px-5 text-xs font-semibold text-muted-foreground uppercase">Net Pay</th>
              <th className="text-center py-4 px-5 text-xs font-semibold text-muted-foreground uppercase hidden sm:table-cell">Status</th>
              <th className="text-center py-4 px-5 text-xs font-semibold text-muted-foreground uppercase">Download</th>
            </tr>
          </thead>
          <tbody>
            {myPayroll.map(p => (
              <tr key={p.id} className="border-b border-border/50 hover:bg-muted/20">
                <td className="py-4 px-5">
                  <p className="text-sm font-medium text-foreground">{p.month} {p.year}</p>
                  <p className="text-xs text-muted-foreground">Pay date: {p.payDate}</p>
                </td>
                <td className="py-4 px-5 text-right hidden sm:table-cell text-sm text-muted-foreground">{formatCurrency(p.basicSalary)}</td>
                <td className="py-4 px-5 text-right hidden md:table-cell text-sm text-emerald-600">+{formatCurrency(p.allowances)}</td>
                <td className="py-4 px-5 text-right hidden md:table-cell text-sm text-red-500">-{formatCurrency(p.deductions)}</td>
                <td className="py-4 px-5 text-right text-sm font-bold text-foreground">{formatCurrency(p.netSalary)}</td>
                <td className="py-4 px-5 text-center hidden sm:table-cell">
                  <Badge label={p.status} className={getStatusColor(p.status)} />
                </td>
                <td className="py-4 px-5 text-center">
                  <button onClick={() => handleDownload(p.month, p.year)} className="p-2 rounded-lg hover:bg-blue-50 text-muted-foreground hover:text-blue-600 transition-colors">
                    <Download size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
