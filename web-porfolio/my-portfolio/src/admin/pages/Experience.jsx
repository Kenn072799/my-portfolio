import { useEffect, useState } from "react";
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../api/experienceApi";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import FormModal, {
  FormField,
  FormInput,
  FormTextarea,
} from "../components/FormModal";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import { SkeletonTable } from "../components/SkeletonCard";

const emptyForm = {
  title: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
  technologies: "",
  current: false,
};

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const res = await getExperiences({ page: 1, pageSize: 100 });
      setExperiences(res.data ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const toDateInput = (val) =>
    val ? new Date(val).toISOString().split("T")[0] : "";

  const openAdd = () => {
    setEditTarget(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditTarget(row);
    setForm({
      title: row.title ?? "",
      company: row.company ?? "",
      location: row.location ?? "",
      startDate: toDateInput(row.startDate),
      endDate: toDateInput(row.endDate),
      description: row.description ?? "",
      technologies: Array.isArray(row.technologies)
        ? row.technologies.join(", ")
        : (row.technologies ?? ""),
      current: row.current ?? false,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        technologies: form.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        endDate: form.current ? null : form.endDate || null,
      };
      if (editTarget) {
        await updateExperience(editTarget.id, payload);
      } else {
        await createExperience(payload);
      }
      setModalOpen(false);
      await fetchExperiences();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteExperience(deleteTarget.id);
      setDeleteTarget(null);
      await fetchExperiences();
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    { key: "title", label: "Title" },
    { key: "company", label: "Company" },
    { key: "location", label: "Location" },
    {
      key: "startDate",
      label: "Period",
      render: (val, row) => {
        const start = val
          ? new Date(val).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })
          : "—";
        const end = row.current
          ? "Present"
          : row.endDate
            ? new Date(row.endDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })
            : "—";
        return `${start} — ${end}`;
      },
    },
    {
      key: "current",
      label: "Current",
      render: (val) => (
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${val ? "bg-green-50 text-green-700" : "bg-bg-muted text-text-muted"}`}
        >
          {val ? "Yes" : "No"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Experience"
        description="Manage your work history"
        action={{ label: "Add Experience", onClick: openAdd }}
      />

      {loading ? (
        <SkeletonTable />
      ) : (
        <DataTable
          columns={columns}
          data={experiences}
          onEdit={openEdit}
          onDelete={setDeleteTarget}
          emptyMessage="No experience entries yet."
        />
      )}

      <FormModal
        isOpen={modalOpen}
        title={editTarget ? "Edit Experience" : "Add Experience"}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        loading={saving}
      >
        <FormField label="Title" required>
          <FormInput
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </FormField>
        <FormField label="Company" required>
          <FormInput
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            required
          />
        </FormField>
        <FormField label="Location">
          <FormInput
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Start Date" required>
            <FormInput
              type="date"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              required
            />
          </FormField>
          <FormField label="End Date">
            <FormInput
              type="date"
              value={form.endDate}
              disabled={form.current}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            />
          </FormField>
        </div>
        <FormField label="Current Position">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.current}
              onChange={(e) =>
                setForm({
                  ...form,
                  current: e.target.checked,
                  endDate: e.target.checked ? "" : form.endDate,
                })
              }
              className="w-4 h-4"
            />
            <span className="text-sm text-text-secondary">
              I currently work here
            </span>
          </label>
        </FormField>
        <FormField label="Description">
          <FormTextarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </FormField>
        <FormField label="Technologies (comma-separated)">
          <FormInput
            placeholder="React, Node.js, AWS"
            value={form.technologies}
            onChange={(e) => setForm({ ...form, technologies: e.target.value })}
          />
        </FormField>
      </FormModal>

      <ConfirmDeleteDialog
        isOpen={!!deleteTarget}
        title="Delete Experience"
        description={`Delete "${deleteTarget?.title} at ${deleteTarget?.company}"? This cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
