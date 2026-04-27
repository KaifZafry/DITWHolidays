import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthProvider';

export default function RequireAdmin({ children }) {
  const location = useLocation();
  const { status } = useAdminAuth();

  if (status === 'loading') {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 fs-5 fw-semibold text-primary">
        Loading...
      </div>
    );
  }

  if (status !== 'authed') {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
}

