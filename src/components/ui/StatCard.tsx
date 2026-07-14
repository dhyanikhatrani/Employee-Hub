import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  trend?: { value: number; positive: boolean };
}

export default function StatCard({ title, value, subtitle, icon: Icon, iconBg, iconColor, trend }: StatCardProps) {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trend.positive ? "text-emerald-600" : "text-red-500"}`}>
              <span>{trend.positive ? "▲" : "▼"}</span>
              <span>{Math.abs(trend.value)}% from last month</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center`}>
          <Icon size={22} className={iconColor} />
        </div>
      </div>
    </div>
  );
}
