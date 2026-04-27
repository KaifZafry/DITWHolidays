import { useMemo, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import PackageForm from './PackageForm';

export default function EditPackage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { apiStatus, packages, updatePackage } = useOutletContext();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const pkg = useMemo(() => packages.find((p) => String(p.id) === String(id)), [packages, id]);

  if (!pkg && apiStatus === 'loading') {
    return (
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="fw-semibold mb-1">Loading package...</div>
          <div className="text-secondary">Fetching data from the server.</div>
        </div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="fw-semibold mb-1">Package not found</div>
          <div className="text-secondary mb-3">The package you are trying to edit does not exist.</div>
          <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/admin/packages')}>
            Back to All Packages
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="vstack gap-3">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
        <div>
          <h1 className="h4 mb-1">Edit Package</h1>
          <div className="text-secondary">Update details and dynamic sections for this package.</div>
        </div>
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/admin/packages')}>
            Back to List
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <PackageForm
        initialValue={pkg}
        submitLabel="Update Package"
        busy={busy}
        onSubmit={async (payload) => {
          setBusy(true);
          setError('');
          try {
            await updatePackage(pkg.id, payload);
            navigate('/admin/packages');
          } catch (err) {
            setError(err?.message || 'Failed to update package');
          } finally {
            setBusy(false);
          }
        }}
      />
    </div>
  );
}
