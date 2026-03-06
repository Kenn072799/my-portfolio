export default function ConfirmDeleteDialog({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
  loading,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-bg-card rounded-xl shadow-xl w-full max-w-sm p-6 mx-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
            🗑
          </div>
          <h2 className="text-lg font-semibold text-text-primary mb-1">
            {title ?? "Delete item?"}
          </h2>
          <p className="text-sm text-text-muted">
            {description ?? "This action cannot be undone."}
          </p>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2 text-sm font-medium text-text-secondary bg-bg-muted hover:bg-bg-muted/70 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-60"
          >
            {loading ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
