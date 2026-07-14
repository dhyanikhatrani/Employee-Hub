export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);

export const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

export const getInitials = (name: string): string =>
  name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

export const getStatusColor = (status: string): string => {
  const map: Record<string, string> = {
    active: "bg-emerald-100 text-emerald-700",
    inactive: "bg-gray-100 text-gray-600",
    onleave: "bg-amber-100 text-amber-700",
    pending: "bg-amber-100 text-amber-700",
    approved: "bg-emerald-100 text-emerald-700",
    rejected: "bg-red-100 text-red-700",
    paid: "bg-emerald-100 text-emerald-700",
    processing: "bg-blue-100 text-blue-700",
    present: "bg-emerald-100 text-emerald-700",
    absent: "bg-red-100 text-red-700",
    late: "bg-amber-100 text-amber-700",
    "half-day": "bg-purple-100 text-purple-700",
    holiday: "bg-blue-100 text-blue-700",
  };
  return map[status] || "bg-gray-100 text-gray-600";
};

export const getLeaveTypeColor = (type: string): string => {
  const map: Record<string, string> = {
    annual: "bg-blue-100 text-blue-700",
    sick: "bg-red-100 text-red-700",
    casual: "bg-purple-100 text-purple-700",
    maternity: "bg-pink-100 text-pink-700",
    paternity: "bg-indigo-100 text-indigo-700",
    unpaid: "bg-gray-100 text-gray-600",
  };
  return map[type] || "bg-gray-100 text-gray-600";
};

export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);
