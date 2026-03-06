import { useEffect, useState } from "react";
import {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from "../api/certificationApi";
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
  issuer: "",
  description: "",
  issueDate: "",
  credentialUrl: "",
};

export default function Certifications() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchCerts = async () => {
    setLoading(true);
    try {
      const res = await getCertifications({ page: 1, pageSize: 100 });
      setCerts(res.data ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCerts();
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
      name: row.name ?? "",
      issuer: row.issuer ?? "",
      description: row.description ?? "",
      issueDate: toDateInput(row.issueDate),
      credentialUrl: row.credentialUrl ?? "",
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        credentialUrl: form.credentialUrl.trim() || null,
      };
      if (editTarget) {
        await updateCertification(editTarget.id, payload);
      } else {
        await createCertification(payload);
      }
      setModalOpen(false);
      await fetchCerts();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteCertification(deleteTarget.id);
      setDeleteTarget(null);
      await fetchCerts();
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "issuer", label: "Issuer" },
    {
      key: "issueDate",
      label: "Issue Date",
      render: (val) =>
        val
          ? new Date(val).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })
          : "—",
    },
    {
      key: "credentialUrl",
      label: "Credential",
      render: (val) =>
        val ? (
          <a
            href={val}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-xs"
          >
            View ↗
          </a>
        ) : (
          "—"
        ),
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Certifications"
        description="Manage your certifications and credentials"
        action={{ label: "Add Certification", onClick: openAdd }}
      />

      {loading ? (
        <SkeletonTable />
      ) : (
        <DataTable
          columns={columns}
          data={certs}
          onEdit={openEdit}
          onDelete={setDeleteTarget}
          emptyMessage="No certifications yet."
        />
      )}

      <FormModal
        isOpen={modalOpen}
        title={editTarget ? "Edit Certification" : "Add Certification"}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        loading={saving}
      >
        <FormField label="Certification Name" required>
          <FormInput
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </FormField>
        <FormField label="Issuer" required>
          <FormInput
            value={form.issuer}
            onChange={(e) => setForm({ ...form, issuer: e.target.value })}
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
        <FormField label="Issue Date" required>
          <FormInput
            type="date"
            value={form.issueDate}
            onChange={(e) => setForm({ ...form, issueDate: e.target.value })}
            required
          />
        </FormField>
        <FormField label="Credential URL">
          <FormInput
            type="url"
            value={form.credentialUrl}
            onChange={(e) =>
              setForm({ ...form, credentialUrl: e.target.value })
            }
          />
        </FormField>
      </FormModal>

      <ConfirmDeleteDialog
        isOpen={!!deleteTarget}
        title="Delete Certification"
        description={`Delete "${deleteTarget?.name}"? This cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
