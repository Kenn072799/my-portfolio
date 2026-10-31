import { useState } from 'react';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { FiArrowLeft, FiArrowUpRight, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import axios from '../../api/axios';
import { login, isAuthenticated } from '../auth';
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const requested = location.state?.from?.pathname;
  const destination = requested?.startsWith('/admin/') && requested !== '/admin/login' ? requested : '/admin/dashboard';
  const [key, setKey] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  if (isAuthenticated()) return <Navigate to={destination} replace />;
  async function submit(event) {
    event.preventDefault();
    setLoading(true); setError('');
    try {
      // Verify against an existing protected endpoint, not a bundled client secret.
      await axios.get('/api/analytics/summary', { headers: { 'X-Api-Key': key } });
      sessionStorage.setItem('admin_api_key', key);
      login(); navigate(destination, { replace: true });
    } catch (failure) {
      setError([401, 403].includes(failure.response?.status) ? 'That access key was not accepted.' : 'Unable to reach the portfolio API. Check that the backend is running.');
    } finally { setLoading(false); }
  }
  return <div className="admin-theme admin-login"><Link className="login-back" to="/"><FiArrowLeft /> Back to portfolio</Link><div className="login-composition"><div className="login-intro"><span className="admin-eyebrow">KENNETH ALTES / PORTFOLIO STUDIO</span><h1>Your work.<br /><span>One workspace.</span></h1><p>Keep your projects, experience, and learning up to date. Everything you publish starts here.</p><div className="login-technical" aria-hidden="true"><span>01</span> Create with purpose.<br /><span>02</span> Keep getting better.<br /><span>03</span> Share what you build.</div></div><section className="login-card" aria-labelledby="login-title"><div className="login-lock"><FiLock /></div><span className="admin-eyebrow">PRIVATE WORKSPACE</span><h2 id="login-title">Welcome back.</h2><p>Sign in to manage your portfolio.</p><form onSubmit={submit}><label htmlFor="access-key">Admin access key</label><div className="login-key"><input id="access-key" type={visible ? 'text' : 'password'} value={key} onChange={(event) => setKey(event.target.value)} autoComplete="current-password" required aria-describedby={error ? 'login-error' : undefined} disabled={loading} /><button type="button" onClick={() => setVisible(!visible)} aria-label={visible ? 'Hide access key' : 'Show access key'}>{visible ? <FiEyeOff /> : <FiEye />}</button></div>{error && <p id="login-error" className="admin-error" role="alert">{error}</p>}<button className="admin-primary login-submit" disabled={!key.trim() || loading}>{loading ? 'Verifying…' : 'Enter workspace'}<FiArrowUpRight /></button></form><small><FiLock /> Access is verified by your portfolio server.</small></section></div></div>;
}
