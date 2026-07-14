import { mockAttendance } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import Badge from "../../components/ui/Badge";
import { getStatusColor } from "../../utils/helpers";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export default function MyAttendance() {
  const { user } = useAuth();
  const myRecords = mockAttendance.filter(a => a.employeeId === user?.id);

  const present = myRecords.filter(a => a.status === "present").length;
  const absent = myRecords.filter(a => a.status === "absent").length;
  const late = myRecords.filter(a => a.status === "late").length;
  const total = myRecords.length;
  const rate = total > 0 ? Math.round((present / total) * 100) : 0;

  return (
    <div className="max-w-4xl space-y-5">
      <h2 className="text-xl font-bold text-foreground">My Attendance</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Attendance Rate", value: `${rate}%`, icon: CheckCircle, bg: "bg-emerald-100", color: "text-emerald-600" },
          { label: "Days Present", value: present, icon: CheckCircle, bg: "bg-blue-100", color: "text-blue-600" },
          { label: "Days Absent", value: absent, icon: XCircle, bg: "bg-red-100", color: "text-red-600" },
          { label: "Late Arrivals", value: late, icon: AlertTriangle, bg: "bg-amber-100", color: "text-amber-600" },
        ].map(s => (
          <div key={s.label} className="bg-card rounded-2xl border border-border p-5 shadow-sm flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
              <s.icon size={18} className={s.color} />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Attendance History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase">Date</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase hidden sm:table-cell">Check In</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase hidden sm:table-cell">Check Out</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Hours</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {myRecords.map(r => (
                <tr key={r.id} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="py-4 px-5 text-sm text-foreground">{r.date}</td>
                  <td className="py-4 px-5 hidden sm:table-cell text-sm font-mono text-foreground">{r.checkIn || "—"}</td>
                  <td className="py-4 px-5 hidden sm:table-cell text-sm font-mono text-foreground">{r.checkOut || "—"}</td>
                  <td className="py-4 px-5 hidden md:table-cell text-sm text-foreground">{r.hoursWorked > 0 ? `${r.hoursWorked}h` : "—"}</td>
                  <td className="py-4 px-5">
                    <Badge label={r.status === "half-day" ? "Half Day" : r.status} className={getStatusColor(r.status)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {myRecords.length === 0 && (
            <div className="py-16 text-center text-muted-foreground text-sm">No attendance records found</div>
          )}
        </div>
      </div>
    </div>
  );
}
