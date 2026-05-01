import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPackage } from '../services/packages';

const TERMS = [
  'Rates are subject to availability at the time of confirmation.',
  'Airfare, hotel rooms, visas, and sightseeing slots are not blocked unless the booking is confirmed.',
  'Any increase in taxes, fuel surcharge, visa fee, entrance fee, or currency fluctuation will be charged extra.',
  'Early check-in, late check-out, room upgrades, and adjoining rooms are subject to hotel availability.',
  'The itinerary can be changed due to weather, traffic, local restrictions, operational reasons, or force majeure.',
  'No refund will be provided for unused services once the tour has started.',
  'Passport validity, visa approval, and immigration clearance are the responsibility of the traveller.',
  'Final vouchers and service confirmations will be shared after receipt of full payment.',
];

function formatMoney(value) {
  const n = Number(value ?? 0);
  if (!Number.isFinite(n) || n <= 0) return 'On request';

  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
  } catch {
    return `Rs. ${n}`;
  }
}

function hasValue(value) {
  return String(value ?? '').trim().length > 0;
}

function MultilineText({ value, empty = 'Not specified.' }) {
  const lines = String(value ?? '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) return <div className="text-secondary">{empty}</div>;

  return (
    <div className="package-detail-lines">
      {lines.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  );
}

function DetailPanel({ title, children, className = '' }) {
  return (
    <section className={`package-detail-panel ${className}`}>
      <div className="package-detail-panel-title">{title}</div>
      {children}
    </section>
  );
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

  const pricingRows = useMemo(() => {
    if (!pkg) return [];

    return [
      ['Base Price', pkg.basePrice],
      ['Double Sharing Price', pkg.doubleSharingPrice],
      ['Single Sharing Price', pkg.singleSharingPrice],
      ['Child With Bed', pkg.childWithBedPrice],
      ['Child Without Bed', pkg.childWithoutBedPrice],
      ['Infant Price', pkg.infantPrice],
      [`Transfers${pkg.transfers?.type ? ` (${pkg.transfers.type})` : ''}`, pkg.transfers?.price],
    ];
  }, [pkg]);

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
      <div className="package-detail-hero">
        {pkg.imageUrl ? <img src={pkg.imageUrl} alt={pkg.title} /> : null}
        <div className="package-detail-hero-overlay" />
        <div className="container package-detail-hero-content">
          
          <div className="package-detail-kicker">{pkg.destination}</div>
          <h1>{pkg.title}</h1>
          <div className="package-detail-hero-meta">
            <span>{pkg.duration} days</span>
            <span>{hasValue(pkg.travelDates) ? pkg.travelDates : 'Flexible dates'}</span>
            <span>{hasValue(pkg.pax) ? pkg.pax : 'Custom pax'}</span>
          </div>
        </div>
      </div>

      <main className="package-detail-page">
        <div className="container">
          <div className="package-detail-summary">
            <div>
              <span>Destination</span>
              <strong>{pkg.destination}</strong>
            </div>
            <div>
              <span>Duration</span>
              <strong>{pkg.duration} Days</strong>
            </div>
            <div>
              <span>Travel Dates</span>
              <strong>{hasValue(pkg.travelDates) ? pkg.travelDates : 'On request'}</strong>
            </div>
            <div>
              <span>Meal Plan</span>
              <strong>{hasValue(pkg.mealPlan) ? 'Included' : 'On request'}</strong>
            </div>
          </div>

          <div className="row g-4 align-items-start">
            <div className="col-12 col-xl-8">
              <DetailPanel title="Day Wise Itinerary" className="package-detail-itinerary">
                {(pkg.itinerary?.length ?? 0) === 0 && <div className="text-secondary">No itinerary added.</div>}
                {(pkg.itinerary ?? []).map((day, index) => (
                  <div key={index} className="package-detail-day">
                    <div className="package-detail-day-number">Day {day.day}</div>
                    <div>
                      <h3>{day.title}</h3>
                      <p>{day.description}</p>
                    </div>
                  </div>
                ))}
              </DetailPanel>

              <div className="row g-4">
                <div className="col-12 col-lg-6">
                  <DetailPanel title="Hotels">
                    {(pkg.hotels?.length ?? 0) === 0 && <div className="text-secondary">No hotels added.</div>}
                    {(pkg.hotels ?? []).map((hotel, index) => (
                      <div key={index} className="package-detail-list-row">
                        <div>
                          <strong>{hotel.name}</strong>
                          <span>{hotel.stars} star hotel</span>
                        </div>
                        <b>{formatMoney(hotel.priceDiff)}</b>
                      </div>
                    ))}
                  </DetailPanel>
                </div>

                <div className="col-12 col-lg-6">
                  <DetailPanel title="Meals">
                    <MultilineText value={pkg.mealPlan} empty="Meal details will be confirmed with the final quote." />
                  </DetailPanel>
                </div>
              </div>

              <div className="row g-4">
                <div className="col-12 col-lg-6">
                  <DetailPanel title="Flights">
                    <MultilineText value={pkg.flightDetails} empty="Flight details are not added yet." />
                  </DetailPanel>
                </div>
                <div className="col-12 col-lg-6">
                  <DetailPanel title="Visa">
                    <MultilineText value={pkg.visaDetails} empty="Visa details are not added yet." />
                  </DetailPanel>
                </div>
              </div>

              <DetailPanel title="Activities & Sightseeing">
                {(pkg.activities?.length ?? 0) === 0 && <div className="text-secondary">No activities added.</div>}
                <div className="package-detail-chip-grid">
                  {(pkg.activities ?? []).map((activity, index) => (
                    <div key={index} className="package-detail-chip">
                      <strong>{activity.name}</strong>
                      <span>
                        {activity.optional ? 'Optional' : 'Included'} | {formatMoney(activity.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </DetailPanel>

              
            </div>

            <div className="col-12 col-xl-4">
              <div className="package-detail-sticky">
                <DetailPanel title="Price Details">
                  <div className="package-detail-price-table">
                    {pricingRows.map(([label, value]) => (
                      <div key={label}>
                        <span>{label}</span>
                        <strong>{formatMoney(value)}</strong>
                      </div>
                    ))}
                  </div>
                </DetailPanel>

                <DetailPanel title="Transfers">
                  <div className="package-detail-transfer">
                    <span>{pkg.transfers?.type || 'Private'}</span>
                    <strong>{formatMoney(pkg.transfers?.price)}</strong>
                  </div>
                </DetailPanel>

                <DetailPanel title="Important Notes">
                  <MultilineText value={pkg.importantNotes} empty="No special notes added." />
                </DetailPanel>
              </div>
            </div>
          </div>
                    <div className="row g-4">
                <div className="col-12 col-lg-6">
                  <DetailPanel title="Inclusions">
                    {(pkg.inclusions?.length ?? 0) === 0 && <div className="text-secondary">No inclusions added.</div>}
                    <ul className="package-detail-check-list">
                      {(pkg.inclusions ?? []).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </DetailPanel>
                </div>
                <div className="col-12 col-lg-6">
                  <DetailPanel title="Exclusions">
                    {(pkg.exclusions?.length ?? 0) === 0 && <div className="text-secondary">No exclusions added.</div>}
                    <ul className="package-detail-cross-list">
                      {(pkg.exclusions ?? []).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </DetailPanel>
                </div>
              </div>
          <DetailPanel title="Terms & Conditions" className="package-detail-terms">
            <ul>
              {TERMS.map((term, index) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
          </DetailPanel>
        </div>
      </main>
    </>
  );
}
