import { useEffect, useMemo, useState } from 'react';
import { Link, Outlet, useOutletContext } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './admin.css';
import { createPackage, deletePackage, getHealth, listPackages, updatePackage } from '../services/packages';

function toErrorMessage(err) {
  return err?.message || 'Something went wrong';
}

export function AdminHome() {
  const { apiStatus, packages } = useOutletContext();

  const totalPackages = packages.length;
  const totalActivities = packages.reduce((acc, p) => acc + (p.activities?.length ?? 0), 0);
  const avgBasePrice =
    totalPackages > 0 ? Math.round(packages.reduce((acc, p) => acc + (Number(p.basePrice) || 0), 0) / totalPackages) : 0;

  const money = (value) => {
    try {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value ?? 0);
    } catch {
      return `₹${value ?? 0}`;
    }
  };

  return (
    <div className="vstack gap-4">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
        <div>
          <h1 className="h4 mb-1">Dashboard</h1>
          <div className="text-secondary">Overview of packages and key stats.</div>
        </div>
        <div className="d-flex gap-2">
          <Link to="/admin/add-package" className="btn btn-primary">
            Add Package
          </Link>
          <Link to="/admin/packages" className="btn btn-outline-secondary">
            View Packages
          </Link>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="text-secondary small">Total Packages</div>
              <div className="display-6 fw-semibold">{totalPackages}</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="text-secondary small">Total Activities</div>
              <div className="display-6 fw-semibold">{totalActivities}</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="text-secondary small">Avg. Base Price</div>
              <div className="display-6 fw-semibold">{money(avgBasePrice)}</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="text-secondary small">API Status</div>
              <div className="fw-semibold mt-2">
                {apiStatus === 'connected' ? 'Connected' : apiStatus === 'error' ? 'Error' : 'Connecting...'}
              </div>
              <div className="small text-secondary">Using Express + MongoDB packages API.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-white d-flex align-items-center justify-content-between">
          <div className="fw-semibold">Quick Start</div>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-12 col-lg-6">
              <div className="border rounded-3 p-3 h-100">
                <div className="fw-semibold mb-1">Create a new package</div>
                <div className="text-secondary mb-3">Use dynamic sections like hotels, itinerary, inclusions, and transfers.</div>
                <Link to="/admin/add-package" className="btn btn-sm btn-primary">
                  Add Package
                </Link>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="border rounded-3 p-3 h-100">
                <div className="fw-semibold mb-1">Manage packages</div>
                <div className="text-secondary mb-3">Edit and delete packages from a searchable table view.</div>
                <Link to="/admin/packages" className="btn btn-sm btn-outline-primary">
                  Go to Packages
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [packages, setPackages] = useState([]);
  const [apiStatus, setApiStatus] = useState('idle'); // idle | loading | connected | error
  const [apiError, setApiError] = useState('');

  const refreshPackages = async () => {
    setApiStatus('loading');
    setApiError('');
    try {
      await getHealth();
      const data = await listPackages();
      setPackages(Array.isArray(data) ? data : []);
      setApiStatus('connected');
    } catch (err) {
      setApiStatus('error');
      setApiError(toErrorMessage(err));
      setPackages([]);
    }
  };

  useEffect(() => {
    refreshPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const actions = useMemo(() => {
    const addPackage = async (pkg) => {
      const created = await createPackage(pkg);
      setPackages((prev) => [created, ...prev.filter((p) => p.id !== created?.id)]);
      return created;
    };

    const updatePackageById = async (id, patch) => {
      const updated = await updatePackage(id, patch);
      setPackages((prev) => prev.map((pkg) => (String(pkg.id) === String(id) ? updated : pkg)));
      return updated;
    };

    const deletePackageById = async (id) => {
      await deletePackage(id);
      setPackages((prev) => prev.filter((pkg) => String(pkg.id) !== String(id)));
    };

    return { addPackage, updatePackage: updatePackageById, deletePackage: deletePackageById };
  }, []);

  const outletContext = useMemo(
    () => ({
      packages,
      setPackages,
      apiStatus,
      apiError,
      refreshPackages,
      ...actions,
    }),
    [packages, apiStatus, apiError, actions],
  );

  return (
    <div className="admin-shell">
      <div className="admin-sidebar d-none d-lg-flex">
        <Sidebar />
      </div>

      <div className="admin-main">
        <Topbar />

        <main className="admin-content container-fluid py-4">
          <Outlet context={outletContext} />
        </main>
      </div>

      <div className="offcanvas offcanvas-start admin-offcanvas" tabIndex="-1" id="adminSidebarOffcanvas" aria-labelledby="adminSidebarOffcanvasLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="adminSidebarOffcanvasLabel">Admin</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>
        <div className="offcanvas-body p-0">
          <Sidebar dataBsDismiss="offcanvas" />
        </div>
      </div>
    </div>
  );
}
