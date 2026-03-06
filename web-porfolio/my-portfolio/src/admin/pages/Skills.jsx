import { useEffect, useState } from "react";
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../api/skillApi";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import FormModal, {
  FormField,
  FormInput,
  FormSelect,
} from "../components/FormModal";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import { SkeletonTable } from "../components/SkeletonCard";

const CATEGORIES = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Mobile",
  "Other",
];
const PROFICIENCY_OPTIONS = [
  { value: 25, label: "Beginner" },
  { value: 50, label: "Intermediate" },
  { value: 75, label: "Advanced" },
  { value: 100, label: "Expert" },
];

const proficiencyToLabel = (val) => {
  const num = Number(val);
  if (num <= 25) return "Beginner";
  if (num <= 50) return "Intermediate";
  if (num <= 75) return "Advanced";
  return "Expert";
};

const emptyForm = {
  name: "",
  category: CATEGORIES[0],
  proficiency: 50,
};

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await getSkills();
      setSkills(res.data ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const openAdd = () => {
    setEditTarget(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditTarget(row);
    setForm({
      name: row.name,
      category: row.category,
      proficiency: row.proficiency ?? 50,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editTarget) {
        await updateSkill(editTarget.id, {
          ...form,
          proficiency: Number(form.proficiency),
        });
      } else {
        await createSkill({ ...form, proficiency: Number(form.proficiency) });
      }
      setModalOpen(false);
      await fetchSkills();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteSkill(deleteTarget.id);
      setDeleteTarget(null);
      await fetchSkills();
    } finally {
      setDeleting(false);
    }
  };

  // Group skills by category
  const grouped = skills.reduce((acc, s) => {
    (acc[s.category] = acc[s.category] || []).push(s);
    return acc;
  }, {});

  const proficiencyBadge = (val) => {
    const label = proficiencyToLabel(val);
    const map = {
      Beginner: "bg-bg-muted text-text-secondary",
      Intermediate: "bg-blue-50 text-blue-700",
      Advanced: "bg-purple-50 text-purple-700",
      Expert: "bg-green-50 text-green-700",
    };
    return (
      <span
        className={`text-xs font-medium px-2 py-0.5 rounded-full ${map[label] ?? "bg-bg-muted text-text-secondary"}`}
      >
        {label}
      </span>
    );
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "category", label: "Category" },
    { key: "proficiency", label: "Proficiency", render: proficiencyBadge },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Skills"
        description="Manage your tech stack"
        action={{ label: "Add Skill", onClick: openAdd }}
      />

      {loading ? (
        <SkeletonTable />
      ) : Object.keys(grouped).length === 0 ? (
        <div className="bg-bg-card rounded-xl border border-border-default shadow-sm p-12 text-center text-sm text-text-muted">
          No skills yet.
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold uppercase text-text-muted tracking-wider mb-2">
                {category}
              </h3>
              <DataTable
                columns={columns}
                data={items}
                onEdit={openEdit}
                onDelete={setDeleteTarget}
              />
            </div>
          ))}
        </div>
      )}

      <FormModal
        isOpen={modalOpen}
        title={editTarget ? "Edit Skill" : "Add Skill"}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        loading={saving}
      >
        <FormField label="Name" required>
          <FormInput
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </FormField>
        <FormField label="Category" required>
          <FormSelect
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            options={CATEGORIES.map((c) => ({ value: c, label: c }))}
          />
        </FormField>
        <FormField label="Proficiency" required>
          <FormSelect
            value={form.proficiency}
            onChange={(e) => setForm({ ...form, proficiency: e.target.value })}
            options={PROFICIENCY_OPTIONS}
          />
        </FormField>
      </FormModal>

      <ConfirmDeleteDialog
        isOpen={!!deleteTarget}
        title="Delete Skill"
        description={`Delete "${deleteTarget?.name}"? This cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
