import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../auth';
export default function RequireAuth({ children }) {
  const location = useLocation();
  return isAuthenticated() ? children : <Navigate to="/admin/login" state={{ from: location }} replace />;
}
