import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login, isAuthenticated } from "../components/RequireAuth";

const CORRECT_KEY = import.meta.env.VITE_ADMIN_API_KEY;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin/dashboard";

  const [key, setKey] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Already logged in → redirect
  if (isAuthenticated()) {
    navigate(from, { replace: true });
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Small timeout to prevent instant brute-force attempts
    setTimeout(() => {
      if (key === CORRECT_KEY) {
        sessionStorage.setItem("admin_api_key", key);
        login();
        navigate(from, { replace: true });
      } else {
        setError("Invalid API key. Access denied.");
        setKey("");
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-bg-card border border-border-default rounded-2xl shadow-sm p-8">
          {/* Icon + Title */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 text-xl">
              🔐
            </div>
            <h1 className="text-xl font-bold text-text-primary">
              Admin Access
            </h1>
            <p className="text-sm text-text-muted mt-1">
              Enter your API key to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">
                API Key
              </label>
              <input
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter your admin API key"
                required
                autoFocus
                className="w-full border border-border-default rounded-lg px-3 py-2 text-sm
                           bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500
                           focus:border-transparent"
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !key}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60
                         text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
            >
              {loading ? "Verifying…" : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-text-muted mt-4">
          <a href="/" className="hover:text-text-secondary transition-colors">
            ← Back to portfolio
          </a>
        </p>
      </div>
    </div>
  );
}
