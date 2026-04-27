import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPackage } from '../services/packages';

function formatMoney(value) {
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value ?? 0);
  } catch {
    return `₹${value ?? 0}`;
  }
}

export default function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getPackage(id);
        if (!active) return;
        setPkg(data ?? null);
      } catch (err) {
        if (!active) return;
        setError(err?.message || 'Failed to load package');
        setPkg(null);
      } finally {
        if (!active) return;
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="fw-semibold">Loading package...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
        <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/package')}>
          Back to Packages
        </button>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="container py-5">
        <div className="fw-semibold mb-2">Package not found</div>
        <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/package')}>
          Back to Packages
        </button>
      </div>
    );
  }

  return (
    <>
     <div className="banner-header section-padding valign bg-img bg-fixed back-position-center" data-overlay-dark="6" >
        <div className="container">
          <div className="row">
            <div className="col-md-12 caption mt-90">
              <h5>Explore in {pkg.destination}</h5>
              <h1>Package <span>Details</span></h1>
            </div>
          </div>
        </div>
      </div>

          <div className="container py-5">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-4">
        <div>
          <div className="text-secondary">Package</div>
          <h1 className="h3 mb-1">{pkg.title}</h1>
          <div className="text-secondary">{pkg.destination}</div>
        </div>
        <div className="d-flex gap-2">
         
          <button type="button" className="btn btn-primary" onClick={() => navigate('/package')}>
            Back
          </button>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="text-secondary small">Duration</div>
              <div className="fs-5 fw-semibold">{pkg.duration} days</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="text-secondary small">Base Price</div>
              <div className="fs-5 fw-semibold">{formatMoney(pkg.basePrice)}</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="text-secondary small">Transfers</div>
              <div className="fs-6 fw-semibold">
                {pkg.transfers?.type ? `${pkg.transfers.type} • ${formatMoney(pkg.transfers.price)}` : '—'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white fw-semibold">Hotels</div>
            <div className="card-body">
              {(pkg.hotels?.length ?? 0) === 0 && <div className="text-secondary">No hotels added.</div>}
              {(pkg.hotels ?? []).map((h, idx) => (
                <div key={idx} className="d-flex align-items-start justify-content-between border-bottom py-2">
                  <div>
                    <div className="fw-semibold">{h.name}</div>
                    <div className="text-secondary small">{h.stars} star</div>
                  </div>
                  <div className="small text-secondary">{formatMoney(h.priceDiff)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white fw-semibold">Activities</div>
            <div className="card-body">
              {(pkg.activities?.length ?? 0) === 0 && <div className="text-secondary">No activities added.</div>}
              {(pkg.activities ?? []).map((a, idx) => (
                <div key={idx} className="d-flex align-items-start justify-content-between border-bottom py-2">
                  <div>
                    <div className="fw-semibold">
                      {a.name}{' '}
                      {a.optional ? <span className="badge text-bg-light ms-2">Optional</span> : null}
                    </div>
                  </div>
                  <div className="small text-secondary">{formatMoney(a.price)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-white fw-semibold">Itinerary</div>
            <div className="card-body">
              {(pkg.itinerary?.length ?? 0) === 0 && <div className="text-secondary">No itinerary added.</div>}
              {(pkg.itinerary ?? []).map((d, idx) => (
                <div key={idx} className="border-bottom py-3">
                  <div className="fw-semibold mb-1">
                    Day {d.day}: {d.title}
                  </div>
                  <div className="text-secondary">{d.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white fw-semibold">Inclusions</div>
            <div className="card-body">
              {(pkg.inclusions?.length ?? 0) === 0 && <div className="text-secondary">No inclusions added.</div>}
              <ul className="mb-0">
                {(pkg.inclusions ?? []).map((x, idx) => (
                  <li key={idx}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white fw-semibold">Exclusions</div>
            <div className="card-body">
              {(pkg.exclusions?.length ?? 0) === 0 && <div className="text-secondary">No exclusions added.</div>}
              <ul className="mb-0">
                {(pkg.exclusions ?? []).map((x, idx) => (
                  <li key={idx}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>

  );
}

