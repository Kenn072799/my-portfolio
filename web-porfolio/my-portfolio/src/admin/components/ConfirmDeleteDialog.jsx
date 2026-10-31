import { FiTrash2 } from 'react-icons/fi';
import Dialog from './Dialog';
export default function ConfirmDeleteDialog({ isOpen, title, description, onConfirm, onCancel, loading, error }) {
  return <Dialog isOpen={isOpen} title={title || 'Delete item?'} onClose={onCancel} busy={loading} compact><div className="delete-body"><div className="delete-icon"><FiTrash2 /></div><p>{description || 'This action cannot be undone.'}</p>{error && <p className="admin-error" role="alert">{error}</p>}</div><div className="admin-form-actions"><button type="button" className="admin-secondary" onClick={onCancel} disabled={loading} autoFocus>Keep item</button><button type="button" className="admin-danger" onClick={onConfirm} disabled={loading}>{loading ? 'Deleting…' : 'Delete item'}</button></div></Dialog>;
}
