import { useState } from "react";
import { Camera, Save, Lock, Phone, User, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import { getInitials, formatDate } from "../../utils/helpers";

type Tab = "personal" | "contact" | "emergency" | "security";

export default function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("personal");

  const handleSave = () => toast.success("Profile updated successfully");

  const tabs = [
    { id: "personal" as Tab, label: "Personal Info", icon: User },
    { id: "contact" as Tab, label: "Contact", icon: Phone },
    { id: "emergency" as Tab, label: "Emergency", icon: AlertCircle },
    { id: "security" as Tab, label: "Security", icon: Lock },
  ];

  return (
    <div className="max-w-3xl space-y-5">
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <div className="flex items-start gap-6">
          <div className="relative">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-2xl object-cover bg-muted" />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center text-white text-2xl font-bold">
                {user ? getInitials(user.name) : "U"}
              </div>
            )}
            <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
              <Camera size={14} />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground">{user?.name}</h2>
            <p className="text-muted-foreground">{user?.position}</p>
            <div className="flex flex-wrap gap-3 mt-3">
              <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">{user?.employeeId}</span>
              <span className="bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full">{user?.department}</span>
              <span className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1 rounded-full">Active</span>
              <span className="bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full">Joined {formatDate(user?.joinDate || "")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-1 bg-muted/50 rounded-xl p-1 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
              ${activeTab === tab.id ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            <tab.icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        {activeTab === "personal" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "First Name", value: user?.name.split(" ")[0] },
                { label: "Last Name", value: user?.name.split(" ").slice(1).join(" ") },
                { label: "Email Address", value: user?.email, type: "email" },
                { label: "Employee ID", value: user?.employeeId, disabled: true },
                { label: "Department", value: user?.department, disabled: true },
                { label: "Position", value: user?.position, disabled: true },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{f.label}</label>
                  <input
                    type={f.type || "text"}
                    defaultValue={f.value}
                    disabled={f.disabled}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              ))}
            </div>
            <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
              <Save size={15} /> Save Changes
            </button>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
                <input defaultValue={user?.phone} className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Work Email</label>
                <input defaultValue={user?.email} className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1.5">Home Address</label>
                <input defaultValue={user?.address} className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
              </div>
            </div>
            <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
              <Save size={15} /> Save Changes
            </button>
          </div>
        )}

        {activeTab === "emergency" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Emergency Contact</h3>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm">
              This information is only used in case of emergency and kept strictly confidential.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Contact Name</label>
                <input defaultValue={user?.emergencyContact.name} className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Relationship</label>
                <input defaultValue={user?.emergencyContact.relationship} className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
                <input defaultValue={user?.emergencyContact.phone} className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
              </div>
            </div>
            <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
              <Save size={15} /> Save Changes
            </button>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Change Password</h3>
            <div className="max-w-sm space-y-4">
              {[
                { label: "Current Password", placeholder: "Enter current password" },
                { label: "New Password", placeholder: "Enter new password" },
                { label: "Confirm New Password", placeholder: "Confirm new password" },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{f.label}</label>
                  <input type="password" placeholder={f.placeholder} className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
                </div>
              ))}
            </div>
            <button onClick={() => toast.success("Password changed successfully")} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
              <Lock size={15} /> Update Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
