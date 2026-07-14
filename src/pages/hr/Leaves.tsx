import { useState } from "react";
import { Clock, CheckCircle, XCircle, Calendar } from "lucide-react";
import { toast } from "sonner";
import { mockLeaveRequests } from "../../data/mockData";
import Badge from "../../components/ui/Badge";
import Pagination from "../../components/ui/Pagination";
import { getStatusColor, getLeaveTypeColor, formatDate } from "../../utils/helpers";

export default function Leaves() {
  const [requests, setRequests] = useState(mockLeaveRequests);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const tabs = [
    { id: "all" as const, label: "All Requests", count: requests.length },
    { id: "pending" as const, label: "Pending", count: requests.filter(r => r.status === "pending").length },
    { id: "approved" as const, label: "Approved", count: requests.filter(r => r.status === "approved").length },
    { id: "rejected" as const, label: "Rejected", count: requests.filter(r => r.status === "rejected").length },
  ];

  const filtered = activeTab === "all" ? requests : requests.filter(r => r.status === activeTab);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const updateStatus = (id: string, status: "approved" | "rejected") => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status, approvedBy: "Sarah Mitchell" } : r));
    toast[status === "approved" ? "success" : "error"](
      status === "approved" ? "Leave request approved" : "Leave request rejected",
      { description: "Status updated successfully" }
    );
  };

  const summary = [
    { label: "Pending Review", count: requests.filter(r => r.status === "pending").length, bg: "bg-amber-100", color: "text-amber-700", icon: Clock },
    { label: "Approved", count: requests.filter(r => r.status === "approved").length, bg: "bg-emerald-100", color: "text-emerald-700", icon: CheckCircle },
    { label: "Rejected", count: requests.filter(r => r.status === "rejected").length, bg: "bg-red-100", color: "text-red-700", icon: XCircle },
    { label: "Total Requests", count: requests.length, bg: "bg-blue-100", color: "text-blue-700", icon: Calendar },
  ];

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-foreground">Leave Requests</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {summary.map(({ label, count, bg, color, icon: Icon }) => (
          <div key={label} className="bg-card rounded-2xl border border-border p-4 shadow-sm flex items-center gap-3">
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

      <div className="flex gap-1 bg-muted/50 rounded-xl p-1 w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setPage(1); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5
              ${activeTab === tab.id ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            {tab.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Employee</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">Type</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">Duration</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell">Reason</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                <th className="text-right py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(req => (
                <tr key={req.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <img src={req.employeeAvatar} alt={req.employeeName} className="w-9 h-9 rounded-full object-cover bg-muted" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{req.employeeName}</p>
                        <p className="text-xs text-muted-foreground">{req.department}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5 hidden sm:table-cell">
                    <Badge label={req.leaveType} className={getLeaveTypeColor(req.leaveType)} />
                  </td>
                  <td className="py-4 px-5 hidden md:table-cell">
                    <p className="text-sm text-foreground">{formatDate(req.startDate)} → {formatDate(req.endDate)}</p>
                    <p className="text-xs text-muted-foreground">{req.days} {req.days === 1 ? "day" : "days"}</p>
                  </td>
                  <td className="py-4 px-5 hidden lg:table-cell">
                    <p className="text-sm text-muted-foreground max-w-[200px] truncate">{req.reason}</p>
                  </td>
                  <td className="py-4 px-5">
                    <Badge label={req.status} className={getStatusColor(req.status)} />
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center justify-end gap-1.5">
                      {req.status === "pending" ? (
                        <>
                          <button onClick={() => updateStatus(req.id, "approved")} className="flex items-center gap-1 px-2.5 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg hover:bg-emerald-100 transition-colors">
                            <CheckCircle size={12} /> Approve
                          </button>
                          <button onClick={() => updateStatus(req.id, "rejected")} className="flex items-center gap-1 px-2.5 py-1.5 bg-red-50 text-red-600 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors">
                            <XCircle size={12} /> Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          {req.approvedBy ? `by ${req.approvedBy}` : "—"}
                        </span>
                      )}
                    </div>
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
