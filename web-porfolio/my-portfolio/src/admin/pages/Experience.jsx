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
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      setError('');
      const res = await getExperiences({ all: true });
      setExperiences(res.data ?? []);
    } catch {
      setError('Unable to complete this request. Check the API connection and try again.');
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
      setError('');
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
    } catch {
      setError('Unable to complete this request. Check the API connection and try again.');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      setError('');
      await deleteExperience(deleteTarget.id);
      setDeleteTarget(null);
      await fetchExperiences();
    } catch {
      setError('Unable to complete this request. Check the API connection and try again.');
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
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${val ? "bg-emerald-400/10 text-emerald-300" : "bg-bg-muted text-text-muted"}`}
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

      {error && !modalOpen && !deleteTarget && <div className="admin-error admin-operation-error" role="alert">{error}<button type="button" aria-label="Dismiss error" onClick={() => setError('')}>×</button></div>}
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
        error={error}
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
        error={error}
      />
    </div>
  );
}
