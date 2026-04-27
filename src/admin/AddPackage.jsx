import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PackageForm from './PackageForm';

export default function AddPackage() {
  const navigate = useNavigate();
  const { addPackage } = useOutletContext();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  return (
    <div className="vstack gap-3">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
        <div>
          <h1 className="h4 mb-1">Add Package</h1>
          <div className="text-secondary">Create a new travel package and manage dynamic pricing sections.</div>
        </div>
        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/admin/packages')}>
          View All Packages
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <PackageForm
        submitLabel="Create Package"
        busy={busy}
        onSubmit={async (payload) => {
          setBusy(true);
          setError('');
          try {
            await addPackage(payload);
            navigate('/admin/packages');
          } catch (err) {
            setError(err?.message || 'Failed to create package');
          } finally {
            setBusy(false);
          }
        }}
      />
    </div>
  );
}
