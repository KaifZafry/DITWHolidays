import { useLocation, matchPath } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { useAdminAuth } from './AdminAuthProvider';

function getTitle(pathname) {
  if (matchPath('/admin/add-package', pathname)) return 'Add Package';
  if (matchPath('/admin/packages', pathname)) return 'All Packages';
  if (matchPath('/admin/edit/:id', pathname)) return 'Edit Package';
  return 'Dashboard';
}

export default function Topbar() {
  const location = useLocation();
  const title = getTitle(location.pathname);
  const { user, logout } = useAdminAuth();

  return (
    <header className="admin-topbar border-bottom bg-white">
      <div className="container-fluid py-3">
        <div className="d-flex align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary d-lg-none"
              data-bs-toggle="offcanvas"
              data-bs-target="#adminSidebarOffcanvas"
              aria-controls="adminSidebarOffcanvas"
            >
              <FiMenu />
            </button>
            <div>
              <div className="fw-semibold">{title}</div>
              <div className="small text-secondary">Travel packages management</div>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="text-end">
              <div className="small text-secondary">Signed in as</div>
              <div className="fw-semibold">{user?.username || 'Admin'}</div>
            </div>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={logout}>
              Logout
            </button>
            <img
              src="https://i.pravatar.cc/80?img=3"
              alt="Admin avatar"
              width="36"
              height="36"
              className="rounded-circle border"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
