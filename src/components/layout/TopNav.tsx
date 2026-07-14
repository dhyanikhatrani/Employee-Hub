import { useState } from "react";
import { Menu, Bell, Search, ChevronDown, Check } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { mockNotifications } from "../../data/mockData";
import { getInitials } from "../../utils/helpers";
import type { Notification } from "../../types";

interface TopNavProps {
  onMenuToggle: () => void;
  title: string;
}

export default function TopNav({ onMenuToggle, title }: TopNavProps) {
  const { user, logout } = useAuth();
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const unread = notifications.filter(n => !n.read).length;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 lg:px-6 relative z-30 shrink-0">
      <div className="flex items-center gap-4">
        <button onClick={onMenuToggle} className="lg:hidden p-2 rounded-lg hover:bg-muted text-muted-foreground">
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-foreground hidden sm:block">{title}</h1>
      </div>

      <div className="hidden md:flex items-center gap-2 bg-muted rounded-xl px-4 py-2 w-72">
        <Search size={16} className="text-muted-foreground" />
        <input
          type="text"
          placeholder="Search employees, reports..."
          className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
            className="relative p-2 rounded-xl hover:bg-muted text-muted-foreground transition-colors"
          >
            <Bell size={20} />
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">{unread}</span>
            )}
          </button>
          {showNotif && (
            <div className="absolute right-0 top-12 w-96 bg-white border border-border rounded-2xl shadow-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <span className="font-semibold text-foreground">Notifications</span>
                <button onClick={markAllRead} className="flex items-center gap-1 text-xs text-primary hover:text-primary/80">
                  <Check size={12} /> Mark all read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className={`px-5 py-3.5 border-b border-border/50 hover:bg-muted/50 cursor-pointer ${!n.read ? "bg-blue-50/50" : ""}`}>
                    <div className="flex gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${!n.read ? "bg-blue-500" : "bg-transparent"}`} />
                      <div>
                        <p className="text-sm font-medium text-foreground">{n.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                        <p className="text-xs text-muted-foreground/70 mt-1">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-muted transition-colors"
          >
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-semibold">
                {user ? getInitials(user.name) : "U"}
              </div>
            )}
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-foreground leading-tight">{user?.name?.split(" ")[0]}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
            <ChevronDown size={14} className="text-muted-foreground" />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-12 w-56 bg-white border border-border rounded-2xl shadow-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <p className="font-medium text-sm text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <div className="py-1">
                <button className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted">View Profile</button>
                <button className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted">Account Settings</button>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                >Sign Out</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {(showNotif || showProfile) && (
        <div className="fixed inset-0 z-[-1]" onClick={() => { setShowNotif(false); setShowProfile(false); }} />
      )}
    </header>
  );
}
