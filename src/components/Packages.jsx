import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ContactForm from './ContactForm';
import DestinationCard from './Destination';
import destinations from '../utils/destination.json';
import { listPackages } from '../services/packages';

function formatMoney(value) {
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value ?? 0);
  } catch {
    return `₹${value ?? 0}`;
  }
}

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await listPackages();
        if (!active) return;
        setPackages(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!active) return;
        setError(err?.message || 'Failed to load packages');
        setPackages([]);
      } finally {
        if (!active) return;
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const hasAdminPackages = packages.length > 0;
  const brochureDestinations = useMemo(() => (Array.isArray(destinations) ? destinations : []), []);
  const fallbackPackageImage = brochureDestinations[0]?.image || '/assets/img/bg-1.jpg';

  return (
    <>
      <div className="banner-header section-padding valign bg-img bg-fixed back-position-center" data-overlay-dark="6">
        <div className="container">
          <div className="row">
            <div className="col-md-12 caption mt-90">
              <h5>Choose your destination</h5>
              <h1>
                Popular <span>Packages</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <section className="section-padding">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 d-flex flex-wrap align-items-end justify-content-between gap-2">
              <div>
                <h2 className="mb-1">Packages</h2>
               
              </div>
             
            </div>
          </div>

          {loading && <div className="text-center py-5 fw-semibold">Loading packages...</div>}

          {!loading && error && (
            <div className="alert alert-warning" role="alert">
              {error}
            </div>
          )}

          {!loading && !error && !hasAdminPackages && (
            <div className="card shadow-sm">
              <div className="card-body text-center py-5">
                <div className="fw-semibold mb-1">No admin packages yet</div>
                <div className="text-secondary mb-3">Create your first package in the admin dashboard and it will show here.</div>
                <Link to="/admin/add-package" className="btn btn-primary">
                  Add Package
                </Link>
              </div>
            </div>
          )}

          {!loading && !error && hasAdminPackages && (
            <div className='destination1'>
 <div className="row">
              {packages.map((p) => (
                <DestinationCard
                  key={p.id}
                  title={p.title}
                  image={p.imageUrl || fallbackPackageImage}
                  link={`/package/${p.id}`}
                  actionLabel="View Details"
                  description={`${p.destination} | ${p.duration} days | From ${formatMoney(p.basePrice)}`}
                />
              ))}
            </div>
            </div>
           
          )}
        </div>
      </section>

      <section className="destination1 section-padding">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <h2 className="mb-1">Brochure PDFs</h2>
              <div className="text-secondary">Quick links to ready-made itinerary PDFs.</div>
            </div>
          </div>
          <div className="row">
            {brochureDestinations.map((destination, index) => (
              <DestinationCard key={index} {...destination} />
            ))}
          </div>
        </div>
      </section>

      <section className="form section">
        <div className="container">
          <div className="row justify-content-center">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

