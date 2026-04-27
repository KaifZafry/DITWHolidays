import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthProvider';

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { status, user, login } = useAdminAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'authed' && user) {
      const to = location.state?.from?.pathname || '/admin';
      navigate(to, { replace: true });
    }
  }, [status, user, location.state, navigate]);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <div className="mb-3">
                <div className="text-secondary small">Admin</div>
                <h1 className="h4 mb-0">Sign in</h1>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setBusy(true);
                  setError('');
                  try {
                    await login(username.trim(), password);
                    const to = location.state?.from?.pathname || '/admin';
                    navigate(to, { replace: true });
                  } catch (err) {
                    setError(err?.message || 'Login failed');
                  } finally {
                    setBusy(false);
                  }
                }}
                className="vstack gap-3"
              >
                <div>
                  <label className="form-label">Username</label>
                  <input
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    placeholder="admin"
                    disabled={busy}
                  />
                </div>
                <div>
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    disabled={busy}
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={busy || status === 'loading'}>
                  {busy ? 'Signing in...' : 'Sign in'}
                </button>
              </form>

              <div className="d-flex justify-content-between mt-3">
                <Link to="/" className="small text-decoration-none">
                  Back to site
                </Link>
                <div className="small text-secondary">Uses backend cookie session</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

