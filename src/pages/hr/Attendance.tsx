import { useState } from "react";
import { CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react";
import { mockAttendance } from "../../data/mockData";
import Badge from "../../components/ui/Badge";
import { getStatusColor } from "../../utils/helpers";

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState("2025-07-14");

  const dayRecords = mockAttendance.filter(a => a.date === selectedDate);
  const present = dayRecords.filter(a => a.status === "present").length;
  const absent = dayRecords.filter(a => a.status === "absent").length;
  const late = dayRecords.filter(a => a.status === "late").length;
  const halfDay = dayRecords.filter(a => a.status === "half-day").length;

  const summary = [
    { label: "Present", count: present, icon: CheckCircle, bg: "bg-emerald-100", color: "text-emerald-600" },
    { label: "Absent", count: absent, icon: XCircle, bg: "bg-red-100", color: "text-red-600" },
    { label: "Late Arrivals", count: late, icon: AlertTriangle, bg: "bg-amber-100", color: "text-amber-600" },
    { label: "Half Day", count: halfDay, icon: Clock, bg: "bg-purple-100", color: "text-purple-600" },
  ];

  const attendanceRate = dayRecords.length > 0 ? Math.round(((present + halfDay * 0.5) / dayRecords.length) * 100) : 0;

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Attendance Tracker</h2>
          <p className="text-sm text-muted-foreground">{attendanceRate}% attendance rate for selected date</p>
        </div>
        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {summary.map(({ label, count, icon: Icon, bg, color }) => (
          <div key={label} className="bg-card rounded-2xl border border-border p-5 shadow-sm flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
              <Icon size={20} className={color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{count}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Daily Attendance Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Employee</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">Department</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">Check In</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">Check Out</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell">Hours</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody>
              {dayRecords.map(record => (
                <tr key={record.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="py-4 px-5">
                    <p className="text-sm font-medium text-foreground">{record.employeeName}</p>
                    <p className="text-xs text-muted-foreground md:hidden">{record.department}</p>
                  </td>
                  <td className="py-4 px-5 hidden md:table-cell">
                    <span className="text-sm text-muted-foreground">{record.department}</span>
                  </td>
                  <td className="py-4 px-5 hidden sm:table-cell">
                    <span className="text-sm text-foreground font-mono">{record.checkIn || "—"}</span>
                  </td>
                  <td className="py-4 px-5 hidden sm:table-cell">
                    <span className="text-sm text-foreground font-mono">{record.checkOut || "—"}</span>
                  </td>
                  <td className="py-4 px-5 hidden lg:table-cell">
                    <span className="text-sm text-foreground">{record.hoursWorked > 0 ? `${record.hoursWorked}h` : "—"}</span>
                  </td>
                  <td className="py-4 px-5">
                    <Badge label={record.status === "half-day" ? "Half Day" : record.status} className={getStatusColor(record.status)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {dayRecords.length === 0 && (
            <div className="py-16 text-center">
              <Clock size={32} className="mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground text-sm">No attendance records for this date</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
