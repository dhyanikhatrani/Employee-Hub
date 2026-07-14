import { useAuth } from "../../context/AuthContext";
import { mockLeaveRequests } from "../../data/mockData";
import Badge from "../../components/ui/Badge";
import { getStatusColor, getLeaveTypeColor, formatDate } from "../../utils/helpers";

export default function LeaveHistory() {
  const { user } = useAuth();
  const myLeaves = mockLeaveRequests.filter(l => l.employeeId === user?.id);

  return (
    <div className="max-w-4xl space-y-5">
      <h2 className="text-xl font-bold text-foreground">Leave History</h2>
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        {myLeaves.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase">Type</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase hidden sm:table-cell">Duration</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Reason</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase hidden lg:table-cell">Applied On</th>
              </tr>
            </thead>
            <tbody>
              {myLeaves.map(leave => (
                <tr key={leave.id} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="py-4 px-5">
                    <Badge label={leave.leaveType} className={getLeaveTypeColor(leave.leaveType)} />
                  </td>
                  <td className="py-4 px-5 hidden sm:table-cell">
                    <p className="text-sm text-foreground">{formatDate(leave.startDate)} → {formatDate(leave.endDate)}</p>
                    <p className="text-xs text-muted-foreground">{leave.days}d</p>
                  </td>
                  <td className="py-4 px-5 hidden md:table-cell">
                    <p className="text-sm text-muted-foreground max-w-[180px] truncate">{leave.reason}</p>
                  </td>
                  <td className="py-4 px-5">
                    <Badge label={leave.status} className={getStatusColor(leave.status)} />
                  </td>
                  <td className="py-4 px-5 hidden lg:table-cell text-sm text-muted-foreground">{formatDate(leave.appliedOn)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-16 text-center text-muted-foreground">No leave requests found</div>
        )}
      </div>
    </div>
  );
}
