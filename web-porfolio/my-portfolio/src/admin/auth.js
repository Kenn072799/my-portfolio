const SESSION_KEY = 'admin_authenticated';
export function isAuthenticated() { return sessionStorage.getItem(SESSION_KEY) === 'true'; }
export function login() { sessionStorage.setItem(SESSION_KEY, 'true'); }
export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem('admin_api_key');
}
