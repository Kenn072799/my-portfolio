export default function DataTable({
  columns,
  data,
  onEdit,
  onDelete,
  emptyMessage = "No records found.",
}) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-bg-card rounded-xl border border-border-default shadow-sm p-12 text-center">
        <p className="text-text-muted text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-bg-card rounded-xl border border-border-default shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-default bg-bg-muted/30">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left text-xs font-semibold text-text-muted uppercase tracking-wide px-5 py-3"
                >
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="text-right text-xs font-semibold text-text-muted uppercase tracking-wide px-5 py-3">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {data.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-bg-muted/40 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-5 py-3 text-text-primary">
                    {col.render
                      ? col.render(row[col.key], row)
                      : (row[col.key] ?? "—")}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-5 py-3 text-right space-x-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="text-red-500 hover:text-red-700 text-xs font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
