import { useMemo, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

function formatMoney(value) {
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value ?? 0);
  } catch {
    return `₹${value ?? 0}`;
  }
}

export default function AllPackages() {
  const navigate = useNavigate();
  const { apiError, apiStatus, packages, deletePackage, refreshPackages } = useOutletContext();
  const [q, setQ] = useState('');
  const [busyId, setBusyId] = useState('');
  const [actionError, setActionError] = useState('');

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return packages;
    return packages.filter((p) => `${p.title} ${p.destination}`.toLowerCase().includes(needle));
  }, [packages, q]);

  return (
    <div className="vstack gap-3">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
        <div>
          <h1 className="h4 mb-1">All Packages</h1>
          <div className="text-secondary">Manage created packages, edit details, or delete.</div>
        </div>
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/admin/add-package')}>
            Add Package
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={refreshPackages}
            disabled={apiStatus === 'loading'}
          >
            {apiStatus === 'loading' ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {apiStatus === 'error' && (
        <div className="alert alert-warning" role="alert">
          <div className="fw-semibold mb-1">API connection issue</div>
          <div className="small">{apiError || 'Unable to fetch packages from the server.'}</div>
        </div>
      )}

      {actionError && (
        <div className="alert alert-danger" role="alert">
          {actionError}
        </div>
      )}

      <div className="card shadow-sm" style={{minHeight:'70px'}}>
        <div className="card-body">
          <div className="row g-2 align-items-center">
            <div className="col-12 col-lg-6">
              <input
                className="form-control"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by title or destination..."
              />
            </div>
            <div className="col-12 col-lg-6 text-lg-end">
              <div className="text-secondary small">
                Showing <span className="fw-semibold">{filtered.length}</span> of{' '}
                <span className="fw-semibold">{packages.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th style={{ minWidth: 220 }}>Title</th>
                <th>Destination</th>
                <th className="text-nowrap">Duration</th>
                <th className="text-nowrap">Base Price</th>
                <th className="text-nowrap">Updated</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="fw-semibold">{p.title}</div>
                    <div className="small text-secondary">{p.hotels?.length ?? 0} hotels • {p.activities?.length ?? 0} activities</div>
                  </td>
                  <td>{p.destination}</td>
                  <td className="text-nowrap">{p.duration} days</td>
                  <td className="text-nowrap">{formatMoney(p.basePrice)}</td>
                  <td className="text-nowrap">
                    {p.updatedAt ? new Date(p.updatedAt).toLocaleString() : '-'}
                  </td>
                  <td className="text-end">
                    <div className="btn-group">
                      <Link to={`/admin/edit/${p.id}`} className="btn btn-sm btn-outline-primary">
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        disabled={String(busyId) === String(p.id)}
                        onClick={() => {
                          const ok = window.confirm(`Delete package "${p.title}"?`);
                          if (!ok) return;
                          setBusyId(p.id);
                          setActionError('');
                          Promise.resolve(deletePackage(p.id)).catch((err) => {
                            setActionError(err?.message || 'Failed to delete package');
                          }).finally(() => {
                            setBusyId('');
                          });
                        }}
                      >
                        {String(busyId) === String(p.id) ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!filtered.length && (
                <tr>
                  <td colSpan="6">
                    <div className="p-4 text-center">
                      <div className="fw-semibold mb-1">No packages found</div>
                      <div className="text-secondary mb-3">Create your first package to see it here.</div>
                      <button type="button" className="btn btn-primary" onClick={() => navigate('/admin/add-package')}>
                        Add Package
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
