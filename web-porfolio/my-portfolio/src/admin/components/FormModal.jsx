export default function FormModal({
  isOpen,
  title,
  onClose,
  onSubmit,
  loading,
  children,
}) {
  if (!isOpen) return null;

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={handleBackdrop}
    >
      <div className="bg-bg-card rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-default">
          <h2 className="text-base font-semibold text-text-primary">{title}</h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={onSubmit}
          className="overflow-y-auto flex-1 px-6 py-4 space-y-4"
        >
          {children}

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-text-secondary bg-bg-muted hover:bg-bg-muted/70 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-60"
            >
              {loading ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* Convenience field components */
export function FormField({ label, required, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-text-secondary mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

export function FormInput({ ...props }) {
  return (
    <input
      className="w-full border border-border-default rounded-lg px-3 py-2 text-sm bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      {...props}
    />
  );
}

export function FormTextarea({ rows = 3, ...props }) {
  return (
    <textarea
      rows={rows}
      className="w-full border border-border-default rounded-lg px-3 py-2 text-sm bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
      {...props}
    />
  );
}

export function FormSelect({ options, ...props }) {
  return (
    <select
      className="w-full border border-border-default rounded-lg px-3 py-2 text-sm bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
