import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../api/projectApi";
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
  name: "",
  description: "",
  longDescription: "",
  technologies: "",
  repositoryUrl: "",
  demoUrl: "",
  featured: false,
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      setError('');
      const res = await getProjects({ all: true });
      setProjects(res.data ?? []);
    } catch {
      setError('Unable to complete this request. Check the API connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAdd = () => {
    setEditTarget(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditTarget(row);
    setForm({
      name: row.name ?? "",
      description: row.description ?? "",
      longDescription: row.longDescription ?? "",
      technologies: Array.isArray(row.technologies)
        ? row.technologies.join(", ")
        : (row.technologies ?? ""),
      repositoryUrl: row.repositoryUrl ?? "",
      demoUrl: row.demoUrl ?? "",
      featured: row.featured ?? false,
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
        longDescription: form.longDescription.trim() || null,
        repositoryUrl: form.repositoryUrl.trim() || null,
        demoUrl: form.demoUrl.trim() || null,
        technologies: form.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };
      if (editTarget) {
        await updateProject(editTarget.id, payload);
      } else {
        await createProject(payload);
      }
      setModalOpen(false);
      await fetchProjects();
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
      await deleteProject(deleteTarget.id);
      setDeleteTarget(null);
      await fetchProjects();
    } catch {
      setError('Unable to complete this request. Check the API connection and try again.');
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    { key: "name", label: "Name" },
    {
      key: "technologies",
      label: "Technologies",
      render: (val) => {
        const arr = Array.isArray(val) ? val : (val ?? "").split(",");
        return (
          <div className="flex flex-wrap gap-1">
            {arr.slice(0, 4).map((t) => (
              <span
                key={t}
                className="bg-cyan-400/10 text-cyan-300 text-xs px-2 py-0.5 rounded-full"
              >
                {t.trim()}
              </span>
            ))}
            {arr.length > 4 && (
              <span className="text-text-muted text-xs">+{arr.length - 4}</span>
            )}
          </div>
        );
      },
    },
    {
      key: "featured",
      label: "Featured",
      render: (val) => (
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${val ? "bg-emerald-400/10 text-emerald-300" : "bg-bg-muted text-text-muted"}`}
        >
          {val ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (val) => (val ? new Date(val).toLocaleDateString() : "—"),
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Projects"
        description="Manage your portfolio projects"
        action={{ label: "Add Project", onClick: openAdd }}
      />

      {error && !modalOpen && !deleteTarget && <div className="admin-error admin-operation-error" role="alert">{error}<button type="button" aria-label="Dismiss error" onClick={() => setError('')}>×</button></div>}
      {loading ? (
        <SkeletonTable />
      ) : (
        <DataTable
          columns={columns}
          data={projects}
          onEdit={openEdit}
          onDelete={setDeleteTarget}
          emptyMessage="No projects yet. Add your first project."
        />
      )}

      {/* Form modal */}
      <FormModal
        isOpen={modalOpen}
        title={editTarget ? "Edit Project" : "Add Project"}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        loading={saving}
        error={error}
      >
        <FormField label="Name" required>
          <FormInput
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </FormField>
        <FormField label="Description" required>
          <FormTextarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </FormField>
        <FormField label="Long Description">
          <FormTextarea
            rows={4}
            value={form.longDescription}
            onChange={(e) =>
              setForm({ ...form, longDescription: e.target.value })
            }
          />
        </FormField>
        <FormField label="Technologies (comma-separated)">
          <FormInput
            placeholder="React, Node.js, PostgreSQL"
            value={form.technologies}
            onChange={(e) => setForm({ ...form, technologies: e.target.value })}
          />
        </FormField>
        <FormField label="Repository URL">
          <FormInput
            type="url"
            value={form.repositoryUrl}
            onChange={(e) =>
              setForm({ ...form, repositoryUrl: e.target.value })
            }
          />
        </FormField>
        <FormField label="Demo URL">
          <FormInput
            type="url"
            value={form.demoUrl}
            onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
          />
        </FormField>
        <FormField label="Featured">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-sm text-text-secondary">
              Mark as featured project
            </span>
          </label>
        </FormField>
      </FormModal>

      <ConfirmDeleteDialog
        isOpen={!!deleteTarget}
        title="Delete Project"
        description={`Delete "${deleteTarget?.name}"? This cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
        error={error}
      />
    </div>
  );
}
