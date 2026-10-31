import { FiPlus } from 'react-icons/fi';
export default function PageHeader({ title, description, action }) {
  return <div className="admin-page-heading"><div><span className="admin-eyebrow">PORTFOLIO STUDIO</span><h1>{title}</h1>{description && <p>{description}</p>}</div>{action && <button type="button" className="admin-primary" onClick={action.onClick}><FiPlus />{action.label}</button>}</div>;
}
