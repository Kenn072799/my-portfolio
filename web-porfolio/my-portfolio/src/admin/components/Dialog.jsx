import { useEffect, useRef, useId } from 'react';
export default function Dialog({ isOpen, title, onClose, busy = false, children, compact = false }) {
  const dialog = useRef(null);
  const heading = useId();
  useEffect(() => {
    const node = dialog.current;
    if (isOpen && !node.open) {
      node.showModal();
      node.querySelector('[autofocus], input:not([type="hidden"]), textarea, select')?.focus();
    }
    if (!isOpen && node.open) node.close();
  }, [isOpen]);
  return <dialog ref={dialog} className={`admin-theme admin-dialog ${compact ? 'compact' : ''}`} aria-labelledby={heading} onCancel={(event) => { event.preventDefault(); if (!busy) onClose(); }} onClick={(event) => { if (event.target === event.currentTarget && !busy) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose(); } }}><div className="admin-dialog-header"><h2 id={heading}>{title}</h2><button type="button" aria-label="Close dialog" onClick={onClose} disabled={busy}>×</button></div>{children}</dialog>;
}
