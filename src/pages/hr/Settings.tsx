import { useState } from "react";
import { Bell, Globe, Save } from "lucide-react";
import { toast } from "sonner";

export default function HRSettings() {
  const [notifications, setNotifications] = useState({ leaveApproval: true, newEmployee: true, payroll: true, attendance: false });
  const handleSave = () => toast.success("Settings saved successfully");

  return (
    <div className="max-w-2xl space-y-5">
      <h2 className="text-xl font-bold text-foreground">System Settings</h2>

      {[
        {
          icon: Bell, title: "Notification Preferences", desc: "Control which events trigger notifications",
          content: (
            <div className="space-y-3">
              {[
                { key: "leaveApproval" as const, label: "Leave approval requests", desc: "Get notified when employees apply for leave" },
                { key: "newEmployee" as const, label: "New employee onboarding", desc: "Alerts when a new employee is added" },
                { key: "payroll" as const, label: "Payroll processing", desc: "Notifications for payroll cycle events" },
                { key: "attendance" as const, label: "Attendance anomalies", desc: "Alert on unusual attendance patterns" },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                    className={`relative w-11 h-6 rounded-full transition-colors ${notifications[item.key] ? "bg-primary" : "bg-muted"}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${notifications[item.key] ? "left-6" : "left-1"}`} />
                  </button>
                </div>
              ))}
            </div>
          )
        },
        {
          icon: Globe, title: "Regional Settings", desc: "Locale, timezone, and currency preferences",
          content: (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Timezone</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option>America/Los_Angeles (PST)</option>
                  <option>America/New_York (EST)</option>
                  <option>Europe/London (GMT)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Currency</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option>USD — US Dollar</option>
                  <option>EUR — Euro</option>
                  <option>GBP — British Pound</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Date Format</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Fiscal Year Start</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option>January</option>
                  <option>April</option>
                  <option>July</option>
                </select>
              </div>
            </div>
          )
        },
      ].map(section => (
        <div key={section.title} className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <section.icon size={18} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{section.title}</h3>
              <p className="text-xs text-muted-foreground">{section.desc}</p>
            </div>
          </div>
          {section.content}
        </div>
      ))}

      <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors">
        <Save size={16} /> Save Settings
      </button>
    </div>
  );
}
