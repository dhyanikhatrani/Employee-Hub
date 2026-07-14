import { useState } from "react";
import { Plus, Edit2, Trash2, Users, DollarSign } from "lucide-react";
import { mockDepartments } from "../../data/mockData";
import type { Department } from "../../types";
import Modal from "../../components/ui/Modal";
import { formatCurrency } from "../../utils/helpers";

export default function Departments() {
  const [departments, setDepartments] = useState(mockDepartments);
  const [showModal, setShowModal] = useState(false);
  const [editDept, setEditDept] = useState<Department | null>(null);

  const handleEdit = (dept: Department) => { setEditDept(dept); setShowModal(true); };
  const handleAdd = () => { setEditDept(null); setShowModal(true); };
  const handleDelete = (id: string) => setDepartments(prev => prev.filter(d => d.id !== id));

  const deptColors = ["bg-blue-500", "bg-purple-500", "bg-emerald-500", "bg-amber-500", "bg-red-500", "bg-cyan-500", "bg-pink-500", "bg-lime-500"];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Departments</h2>
          <p className="text-sm text-muted-foreground">{departments.length} departments across AcmeCorp</p>
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90">
          <Plus size={16} /> Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {departments.map((dept, idx) => (
          <div key={dept.id} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
            <div className={`h-2 ${deptColors[idx % deptColors.length]}`} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{dept.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{dept.description}</p>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(dept)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => handleDelete(dept.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 mb-4">
                <img src={dept.headAvatar} alt={dept.head} className="w-9 h-9 rounded-full object-cover bg-muted" />
                <div>
                  <p className="text-xs text-muted-foreground">Department Head</p>
                  <p className="text-sm font-medium text-foreground">{dept.head}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-blue-50">
                  <Users size={16} className="text-blue-600" />
                  <div>
                    <p className="text-xs text-blue-600/70">Employees</p>
                    <p className="text-sm font-bold text-blue-700">{dept.totalEmployees}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50">
                  <DollarSign size={16} className="text-emerald-600" />
                  <div>
                    <p className="text-xs text-emerald-600/70">Budget</p>
                    <p className="text-sm font-bold text-emerald-700">{formatCurrency(dept.budget / 1000)}K</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title={editDept ? "Edit Department" : "Add Department"}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Department Name</label>
            <input defaultValue={editDept?.name} className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" placeholder="e.g. Engineering" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Department Head</label>
            <input defaultValue={editDept?.head} className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" placeholder="Head name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
            <textarea defaultValue={editDept?.description} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm resize-none" placeholder="Brief description..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Annual Budget ($)</label>
            <input type="number" defaultValue={editDept?.budget} className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" placeholder="1000000" />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted">Cancel</button>
            <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90">
              {editDept ? "Save Changes" : "Add Department"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
