import { Link } from 'react-router-dom';
export default function NotFound() {
  return <main className="admin-theme not-found"><span className="admin-eyebrow">404 / PAGE NOT FOUND</span><h1>Let’s get you back on track.</h1><p>The requested page is unavailable. Your portfolio is one click away.</p><Link to="/" className="admin-primary">Back to portfolio</Link></main>;
}
