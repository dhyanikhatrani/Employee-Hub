import { useState } from "react";
import { CalendarPlus, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { mockLeaveBalance } from "../../data/mockData";

export default function ApplyLeave() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ leaveType: "annual", startDate: "", endDate: "", reason: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Leave request submitted", { description: "Your request is pending manager approval" });
  };

  return (
    <div className="max-w-2xl space-y-5">
      <h2 className="text-xl font-bold text-foreground">Apply for Leave</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {mockLeaveBalance.map(lb => (
          <div key={lb.type} className="bg-card rounded-xl border border-border p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-foreground">{lb.remaining}</p>
            <p className="text-xs text-muted-foreground mt-1">{lb.type.split(" ")[0]}</p>
            <p className="text-xs text-muted-foreground">of {lb.total} days</p>
          </div>
        ))}
      </div>

      {submitted ? (
        <div className="bg-card rounded-2xl border border-border shadow-sm p-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={28} className="text-emerald-600" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Request Submitted!</h3>
          <p className="text-muted-foreground text-sm mt-2">Your leave request has been sent for approval. You will be notified once reviewed.</p>
          <button onClick={() => setSubmitted(false)} className="mt-5 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
            Apply Another
          </button>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Leave Type</label>
              <select
                value={form.leaveType}
                onChange={e => setForm(prev => ({ ...prev, leaveType: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
              >
                <option value="annual">Annual Leave</option>
                <option value="sick">Sick Leave</option>
                <option value="casual">Casual Leave</option>
                <option value="maternity">Maternity Leave</option>
                <option value="paternity">Paternity Leave</option>
                <option value="unpaid">Unpaid Leave</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Start Date</label>
                <input
                  type="date"
                  required
                  value={form.startDate}
                  onChange={e => setForm(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">End Date</label>
                <input
                  type="date"
                  required
                  value={form.endDate}
                  onChange={e => setForm(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Reason</label>
              <textarea
                required
                rows={4}
                value={form.reason}
                onChange={e => setForm(prev => ({ ...prev, reason: e.target.value }))}
                placeholder="Please describe the reason for your leave request..."
                className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm resize-none"
              />
            </div>
            <button type="submit" className="flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
              <CalendarPlus size={16} /> Submit Leave Request
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
