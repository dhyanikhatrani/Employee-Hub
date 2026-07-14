import { useState } from "react";
import { Search, Plus, Eye, Edit2, Trash2, ChevronDown, Phone, Mail, MapPin, Calendar } from "lucide-react";
import { mockUsers, mockDepartments } from "../../data/mockData";
import type { User } from "../../types";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import Pagination from "../../components/ui/Pagination";
import { getStatusColor, formatDate, formatCurrency, getInitials } from "../../utils/helpers";

export default function Employees() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [employees, setEmployees] = useState(mockUsers);
  const PER_PAGE = 5;

  const filtered = employees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase()) || e.employeeId.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "All" || e.department === deptFilter;
    const matchStatus = statusFilter === "All" || e.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const deleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Employee Management</h2>
          <p className="text-sm text-muted-foreground">{filtered.length} employees found</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} /> Add Employee
        </button>
      </div>

      <div className="bg-card rounded-2xl border border-border p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by name, email or ID..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <select
                value={deptFilter}
                onChange={e => { setDeptFilter(e.target.value); setPage(1); }}
                className="appearance-none pl-4 pr-8 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
              >
                <option value="All">All Departments</option>
                {mockDepartments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
                className="appearance-none pl-4 pr-8 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="onleave">On Leave</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Employee</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">Department</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell">Position</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden xl:table-cell">Join Date</th>
                <th className="text-left py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden xl:table-cell">Salary</th>
                <th className="text-right py-4 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((emp) => (
                <tr key={emp.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-full object-cover bg-muted" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{emp.name}</p>
                        <p className="text-xs text-muted-foreground">{emp.employeeId} · {emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5 hidden md:table-cell">
                    <span className="text-sm text-foreground">{emp.department}</span>
                  </td>
                  <td className="py-4 px-5 hidden lg:table-cell">
                    <span className="text-sm text-muted-foreground">{emp.position}</span>
                  </td>
                  <td className="py-4 px-5">
                    <Badge label={emp.status === "onleave" ? "On Leave" : emp.status} className={getStatusColor(emp.status)} />
                  </td>
                  <td className="py-4 px-5 hidden xl:table-cell">
                    <span className="text-sm text-muted-foreground">{formatDate(emp.joinDate)}</span>
                  </td>
                  <td className="py-4 px-5 hidden xl:table-cell">
                    <span className="text-sm font-medium text-foreground">{formatCurrency(emp.salary)}</span>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setSelectedEmployee(emp)} className="p-2 rounded-lg hover:bg-blue-50 text-muted-foreground hover:text-blue-600 transition-colors">
                        <Eye size={15} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                        <Edit2 size={15} />
                      </button>
                      <button onClick={() => deleteEmployee(emp.id)} className="p-2 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors">
                        <Trash2 size={15} />
                      </button>
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

      <Modal open={!!selectedEmployee} onClose={() => setSelectedEmployee(null)} title="Employee Details" size="lg">
        {selectedEmployee && (
          <div className="space-y-6">
            <div className="flex items-start gap-5">
              <img src={selectedEmployee.avatar} alt={selectedEmployee.name} className="w-20 h-20 rounded-2xl object-cover bg-muted" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground">{selectedEmployee.name}</h3>
                <p className="text-muted-foreground">{selectedEmployee.position}</p>
                <div className="flex items-center gap-3 mt-2">
                  <Badge label={selectedEmployee.employeeId} className="bg-blue-50 text-blue-700" />
                  <Badge label={selectedEmployee.status === "onleave" ? "On Leave" : selectedEmployee.status} className={getStatusColor(selectedEmployee.status)} />
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">{formatCurrency(selectedEmployee.salary)}</p>
                <p className="text-xs text-muted-foreground">Annual Salary</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <Mail size={16} className="text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground">{selectedEmployee.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <Phone size={16} className="text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium text-foreground">{selectedEmployee.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <MapPin size={16} className="text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="text-sm font-medium text-foreground">{selectedEmployee.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <Calendar size={16} className="text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Join Date</p>
                  <p className="text-sm font-medium text-foreground">{formatDate(selectedEmployee.joinDate)}</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Emergency Contact</p>
              <p className="text-sm font-medium text-foreground">{selectedEmployee.emergencyContact.name}</p>
              <p className="text-sm text-muted-foreground">{selectedEmployee.emergencyContact.relationship} · {selectedEmployee.emergencyContact.phone}</p>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Employee" size="lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "First Name", placeholder: "John" },
            { label: "Last Name", placeholder: "Doe" },
            { label: "Email", placeholder: "john.doe@acmecorp.com", type: "email" },
            { label: "Phone", placeholder: "+1 (555) 000-0000" },
            { label: "Position", placeholder: "Software Engineer" },
            { label: "Salary", placeholder: "85000", type: "number" },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-sm font-medium text-foreground mb-1.5">{f.label}</label>
              <input type={f.type || "text"} placeholder={f.placeholder} className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm" />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Department</label>
            <select className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
              {mockDepartments.map(d => <option key={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Join Date</label>
            <input type="date" className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors">Cancel</button>
          <button onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">Add Employee</button>
        </div>
      </Modal>
    </div>
  );
}
