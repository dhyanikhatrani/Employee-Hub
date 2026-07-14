import { useState } from "react";
import { Bell, CheckCheck, Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { mockNotifications } from "../../data/mockData";
import type { Notification } from "../../types";

const typeIcon: Record<string, React.ElementType> = {
  info: Info, success: CheckCircle, warning: AlertTriangle, error: XCircle
};
const typeBg: Record<string, string> = {
  info: "bg-blue-100 text-blue-600",
  success: "bg-emerald-100 text-emerald-600",
  warning: "bg-amber-100 text-amber-600",
  error: "bg-red-100 text-red-600"
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const markAll = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Notifications</h2>
        <button onClick={markAll} className="flex items-center gap-1.5 text-sm text-primary font-medium hover:text-primary/80">
          <CheckCheck size={14} /> Mark all read
        </button>
      </div>
      <div className="space-y-3">
        {notifications.map(n => {
          const Icon = typeIcon[n.type] || Bell;
          return (
            <div key={n.id} className={`bg-card rounded-2xl border ${!n.read ? "border-primary/20 shadow-sm shadow-primary/5" : "border-border"} p-4 flex gap-4 transition-all`}>
              <div className={`w-10 h-10 rounded-xl ${typeBg[n.type]} flex items-center justify-center shrink-0`}>
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">{n.title}</p>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                <p className="text-xs text-muted-foreground/70 mt-1.5">{n.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
