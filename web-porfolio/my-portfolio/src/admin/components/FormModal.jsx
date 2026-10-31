import { Children, cloneElement, isValidElement, useId } from 'react';
import Dialog from './Dialog';
export default function FormModal({ isOpen, title, onClose, onSubmit, loading, error, children }) {
  return <Dialog isOpen={isOpen} title={title} onClose={onClose} busy={loading}><form onSubmit={onSubmit} className="admin-form"><div className="admin-form-fields">{children}{error && <p className="admin-error" role="alert">{error}</p>}</div><div className="admin-form-actions"><button type="button" className="admin-secondary" onClick={onClose} disabled={loading}>Cancel</button><button type="submit" className="admin-primary" disabled={loading}>{loading ? 'Saving…' : 'Save changes'}</button></div></form></Dialog>;
}
export function FormField({ label, required, children }) {
  const id = useId();
  const elements = Children.toArray(children);
  const hasLabel = elements.some((child) => isValidElement(child) && child.type === 'label');
  return <div className="admin-field">{hasLabel ? <div className="admin-field-caption">{label}</div> : <label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>}{elements.map((child) => !hasLabel && isValidElement(child) ? cloneElement(child, { id }) : child)}</div>;
}
export function FormInput(props) { return <input className="admin-input" {...props} />; }
export function FormTextarea({ rows = 3, ...props }) { return <textarea className="admin-input" rows={rows} {...props} />; }
export function FormSelect({ options, ...props }) { return <select className="admin-input" {...props}>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>; }
