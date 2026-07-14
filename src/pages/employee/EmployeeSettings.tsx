import { useState } from "react";
import { Bell, Globe, Save } from "lucide-react";
import { toast } from "sonner";

export default function EmployeeSettings() {
  const [notifs, setNotifs] = useState({ leaveStatus: true, payslip: true, attendance: false, announcements: true });

  return (
    <div className="max-w-2xl space-y-5">
      <h2 className="text-xl font-bold text-foreground">Settings</h2>
      {[
        {
          icon: Bell, title: "Notification Preferences", desc: "Choose what you want to be notified about",
          content: (
            <div className="space-y-3">
              {[
                { key: "leaveStatus" as const, label: "Leave request updates", desc: "Status changes on your leave applications" },
                { key: "payslip" as const, label: "Payslip availability", desc: "When your monthly payslip is ready" },
                { key: "attendance" as const, label: "Attendance reminders", desc: "Daily check-in/check-out reminders" },
                { key: "announcements" as const, label: "Company announcements", desc: "General company news and updates" },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => setNotifs(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                    className={`relative w-11 h-6 rounded-full transition-colors ${notifs[item.key] ? "bg-primary" : "bg-muted"}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${notifs[item.key] ? "left-6" : "left-1"}`} />
                  </button>
                </div>
              ))}
            </div>
          )
        },
        {
          icon: Globe, title: "Display Preferences", desc: "Language and region settings",
          content: (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Language</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Spanish</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Timezone</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option>America/Los_Angeles</option>
                  <option>America/New_York</option>
                  <option>Europe/London</option>
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
      <button onClick={() => toast.success("Settings saved")} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors">
        <Save size={16} /> Save Settings
      </button>
    </div>
  );
}
