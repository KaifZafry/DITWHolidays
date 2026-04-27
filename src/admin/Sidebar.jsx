/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import { FiGrid, FiPackage, FiPlusCircle } from 'react-icons/fi';

function SideNavLink({ to, icon, children, dataBsDismiss }) {
  return (
    <NavLink
      to={to}
      end={to === '/admin'}
      className={({ isActive }) =>
        `admin-nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-3 ${isActive ? 'active' : ''}`
      }
      data-bs-dismiss={dataBsDismiss}
    >
      <span className="admin-nav-icon">{icon}</span>
      <span className="text-truncate">{children}</span>
    </NavLink>
  );
}

export default function Sidebar({ dataBsDismiss } = {}) {
  return (
    <aside className="admin-sidebar-inner">
      <div className="admin-brand px-3 py-3 border-bottom">
        <div className="fw-semibold">Travel Admin</div>
        <div className="small text-secondary">Dashboard</div>
      </div>

      <nav className="p-2">
        <div className="text-uppercase small text-secondary px-3 pt-2 pb-1">Manage</div>
        <div className="d-grid gap-1 px-2 pb-2">
          <SideNavLink to="/admin" icon={<FiGrid />} dataBsDismiss={dataBsDismiss}>
            Dashboard
          </SideNavLink>
          <SideNavLink to="/admin/add-package" icon={<FiPlusCircle />} dataBsDismiss={dataBsDismiss}>
            Add Package
          </SideNavLink>
          <SideNavLink to="/admin/packages" icon={<FiPackage />} dataBsDismiss={dataBsDismiss}>
            All Packages
          </SideNavLink>
        </div>
      </nav>

      <div className="mt-auto p-3 border-top">
        <div className="small text-secondary">Future-ready</div>
        <div className="small">API integration ready</div>
      </div>
    </aside>
  );
}
