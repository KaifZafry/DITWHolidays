/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';

const DEFAULT_PACKAGE = {
  title: '',
  destination: '',
  duration: '',
  basePrice: '',
  hotels: [{ name: '', stars: 4, priceDiff: 0 }],
  activities: [{ name: '', price: 0, optional: false }],
  itinerary: [{ day: 1, title: '', description: '' }],
  inclusions: [],
  exclusions: [],
  transfers: { type: 'Private', price: 0 },
};

function normalizeInitial(value) {
  const base = value ?? {};
  return {
    ...DEFAULT_PACKAGE,
    ...base,
    hotels: Array.isArray(base.hotels) && base.hotels.length ? base.hotels : DEFAULT_PACKAGE.hotels,
    activities: Array.isArray(base.activities) && base.activities.length ? base.activities : DEFAULT_PACKAGE.activities,
    itinerary: Array.isArray(base.itinerary) && base.itinerary.length ? base.itinerary : DEFAULT_PACKAGE.itinerary,
    inclusions: Array.isArray(base.inclusions) ? base.inclusions : [],
    exclusions: Array.isArray(base.exclusions) ? base.exclusions : [],
    transfers: { ...DEFAULT_PACKAGE.transfers, ...(base.transfers ?? {}) },
  };
}

function toNumber(value, fallback = 0) {
  const n = typeof value === 'number' ? value : Number(String(value ?? '').trim());
  return Number.isFinite(n) ? n : fallback;
}

export default function PackageForm({
  initialValue,
  onSubmit,
  submitLabel = 'Save Package',
  busy = false,
}) {
  const initial = useMemo(() => normalizeInitial(initialValue), [initialValue]);
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [newInclusion, setNewInclusion] = useState('');
  const [newExclusion, setNewExclusion] = useState('');

  useEffect(() => {
    setForm(initial);
    setErrors({});
  }, [initial]);

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const validate = (nextForm) => {
    const nextErrors = {};
    if (!String(nextForm.title).trim()) nextErrors.title = 'Title is required';
    if (!String(nextForm.destination).trim()) nextErrors.destination = 'Destination is required';
    if (toNumber(nextForm.duration, 0) <= 0) nextErrors.duration = 'Duration must be greater than 0';
    if (toNumber(nextForm.basePrice, -1) < 0) nextErrors.basePrice = 'Base price must be 0 or more';
    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const payload = {
      ...form,
      duration: toNumber(form.duration, 0),
      basePrice: toNumber(form.basePrice, 0),
      hotels: (form.hotels ?? [])
        .map((h) => ({
          name: String(h.name ?? '').trim(),
          stars: toNumber(h.stars, 0),
          priceDiff: toNumber(h.priceDiff, 0),
        }))
        .filter((h) => h.name),
      activities: (form.activities ?? [])
        .map((a) => ({
          name: String(a.name ?? '').trim(),
          price: toNumber(a.price, 0),
          optional: Boolean(a.optional),
        }))
        .filter((a) => a.name),
      itinerary: (form.itinerary ?? [])
        .map((d) => ({
          day: toNumber(d.day, 1),
          title: String(d.title ?? '').trim(),
          description: String(d.description ?? '').trim(),
        }))
        .filter((d) => d.title && d.description)
        .sort((a, b) => a.day - b.day),
      inclusions: (form.inclusions ?? []).map((x) => String(x ?? '').trim()).filter(Boolean),
      exclusions: (form.exclusions ?? []).map((x) => String(x ?? '').trim()).filter(Boolean),
      transfers: {
        type: form.transfers?.type === 'SIC' ? 'SIC' : 'Private',
        price: toNumber(form.transfers?.price, 0),
      },
    };

    onSubmit?.(payload);
  };

  const addInclusion = () => {
    const v = newInclusion.trim();
    if (!v) return;
    setForm((prev) => ({ ...prev, inclusions: [...(prev.inclusions ?? []), v] }));
    setNewInclusion('');
  };

  const addExclusion = () => {
    const v = newExclusion.trim();
    if (!v) return;
    setForm((prev) => ({ ...prev, exclusions: [...(prev.exclusions ?? []), v] }));
    setNewExclusion('');
  };

  return (
    <form onSubmit={handleSubmit} className="vstack gap-4">
      <div className="card shadow-sm">
        <div className="card-header bg-white">
          <div className="fw-semibold">Package Details</div>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-12 col-lg-6">
              <label className="form-label">Title *</label>
              <input
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                value={form.title}
                onChange={(e) => setField('title', e.target.value)}
                placeholder="e.g., 6 Days Singapore Getaway"
              />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>
            <div className="col-12 col-lg-6">
              <label className="form-label">Destination *</label>
              <input
                className={`form-control ${errors.destination ? 'is-invalid' : ''}`}
                value={form.destination}
                onChange={(e) => setField('destination', e.target.value)}
                placeholder="e.g., Singapore"
              />
              {errors.destination && <div className="invalid-feedback">{errors.destination}</div>}
            </div>
            <div className="col-12 col-lg-3">
              <label className="form-label">Duration (days) *</label>
              <input
                type="number"
                min="1"
                className={`form-control ${errors.duration ? 'is-invalid' : ''}`}
                value={form.duration}
                onChange={(e) => setField('duration', e.target.value)}
              />
              {errors.duration && <div className="invalid-feedback">{errors.duration}</div>}
            </div>
            <div className="col-12 col-lg-3">
              <label className="form-label">Base Price *</label>
              <input
                type="number"
                min="0"
                className={`form-control ${errors.basePrice ? 'is-invalid' : ''}`}
                value={form.basePrice}
                onChange={(e) => setField('basePrice', e.target.value)}
              />
              {errors.basePrice && <div className="invalid-feedback">{errors.basePrice}</div>}
            </div>
            <div className="col-12 col-lg-6">
              <label className="form-label">Transfers</label>
              <div className="row g-2">
                <div className="col-6">
                  <select
                    className="form-select"
                    value={form.transfers?.type ?? 'Private'}
                    onChange={(e) => setForm((prev) => ({ ...prev, transfers: { ...(prev.transfers ?? {}), type: e.target.value } }))}
                  >
                    <option value="Private">Private</option>
                    <option value="SIC">SIC</option>
                  </select>
                </div>
                <div className="col-6">
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    value={form.transfers?.price ?? 0}
                    onChange={(e) => setForm((prev) => ({ ...prev, transfers: { ...(prev.transfers ?? {}), price: e.target.value } }))}
                    placeholder="Price"
                  />
                </div>
              </div>
              <div className="form-text">Transfers price will be added on top of base price later via dynamic pricing rules.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <div className="fw-semibold">Hotels</div>
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={() => setForm((prev) => ({ ...prev, hotels: [...(prev.hotels ?? []), { name: '', stars: 4, priceDiff: 0 }] }))}
          >
            Add Hotel
          </button>
        </div>
        <div className="card-body">
          <div className="vstack gap-3">
            {(form.hotels ?? []).map((hotel, idx) => (
              <div key={idx} className="border rounded-3 p-3">
                <div className="row g-3 align-items-end">
                  <div className="col-12 col-lg-6">
                    <label className="form-label">Name</label>
                    <input
                      className="form-control"
                      value={hotel.name ?? ''}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          hotels: prev.hotels.map((h, i) => (i === idx ? { ...h, name: e.target.value } : h)),
                        }))
                      }
                      placeholder="e.g., Hotel Boss"
                    />
                  </div>
                  <div className="col-6 col-lg-2">
                    <label className="form-label">Stars</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      className="form-control"
                      value={hotel.stars ?? 4}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          hotels: prev.hotels.map((h, i) => (i === idx ? { ...h, stars: e.target.value } : h)),
                        }))
                      }
                    />
                  </div>
                  <div className="col-6 col-lg-3">
                    <label className="form-label">Price Difference</label>
                    <input
                      type="number"
                      className="form-control"
                      value={hotel.priceDiff ?? 0}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          hotels: prev.hotels.map((h, i) => (i === idx ? { ...h, priceDiff: e.target.value } : h)),
                        }))
                      }
                      placeholder="e.g., 2500"
                    />
                  </div>
                  <div className="col-12 col-lg-1 text-lg-end">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger w-100"
                      disabled={(form.hotels ?? []).length <= 1}
                      onClick={() => setForm((prev) => ({ ...prev, hotels: prev.hotels.filter((_, i) => i !== idx) }))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <div className="fw-semibold">Activities</div>
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={() => setForm((prev) => ({ ...prev, activities: [...(prev.activities ?? []), { name: '', price: 0, optional: false }] }))}
          >
            Add Activity
          </button>
        </div>
        <div className="card-body">
          <div className="vstack gap-3">
            {(form.activities ?? []).map((activity, idx) => (
              <div key={idx} className="border rounded-3 p-3">
                <div className="row g-3 align-items-end">
                  <div className="col-12 col-lg-7">
                    <label className="form-label">Name</label>
                    <input
                      className="form-control"
                      value={activity.name ?? ''}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          activities: prev.activities.map((a, i) => (i === idx ? { ...a, name: e.target.value } : a)),
                        }))
                      }
                      placeholder="e.g., Night Safari"
                    />
                  </div>
                  <div className="col-6 col-lg-2">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      value={activity.price ?? 0}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          activities: prev.activities.map((a, i) => (i === idx ? { ...a, price: e.target.value } : a)),
                        }))
                      }
                    />
                  </div>
                  <div className="col-6 col-lg-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`activity_optional_${idx}`}
                        checked={Boolean(activity.optional)}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            activities: prev.activities.map((a, i) => (i === idx ? { ...a, optional: e.target.checked } : a)),
                          }))
                        }
                      />
                      <label className="form-check-label" htmlFor={`activity_optional_${idx}`}>
                        Optional
                      </label>
                    </div>
                  </div>
                  <div className="col-12 col-lg-1 text-lg-end">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger w-100"
                      disabled={(form.activities ?? []).length <= 1}
                      onClick={() => setForm((prev) => ({ ...prev, activities: prev.activities.filter((_, i) => i !== idx) }))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <div className="fw-semibold">Itinerary</div>
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                itinerary: [...(prev.itinerary ?? []), { day: (prev.itinerary?.length ?? 0) + 1, title: '', description: '' }],
              }))
            }
          >
            Add Day
          </button>
        </div>
        <div className="card-body">
          <div className="vstack gap-3">
            {(form.itinerary ?? []).map((day, idx) => (
              <div key={idx} className="border rounded-3 p-3">
                <div className="row g-3 align-items-end">
                  <div className="col-12 col-lg-2">
                    <label className="form-label">Day</label>
                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      value={day.day ?? idx + 1}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          itinerary: prev.itinerary.map((d, i) => (i === idx ? { ...d, day: e.target.value } : d)),
                        }))
                      }
                    />
                  </div>
                  <div className="col-12 col-lg-4">
                    <label className="form-label">Title</label>
                    <input
                      className="form-control"
                      value={day.title ?? ''}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          itinerary: prev.itinerary.map((d, i) => (i === idx ? { ...d, title: e.target.value } : d)),
                        }))
                      }
                      placeholder="e.g., Arrival + City Tour"
                    />
                  </div>
                  <div className="col-12 col-lg-5">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      value={day.description ?? ''}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          itinerary: prev.itinerary.map((d, i) => (i === idx ? { ...d, description: e.target.value } : d)),
                        }))
                      }
                      placeholder="Short day plan..."
                    />
                  </div>
                  <div className="col-12 col-lg-1 text-lg-end">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger w-100"
                      disabled={(form.itinerary ?? []).length <= 1}
                      onClick={() => setForm((prev) => ({ ...prev, itinerary: prev.itinerary.filter((_, i) => i !== idx) }))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white">
              <div className="fw-semibold">Inclusions</div>
            </div>
            <div className="card-body">
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  value={newInclusion}
                  onChange={(e) => setNewInclusion(e.target.value)}
                  placeholder="Add inclusion..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addInclusion();
                    }
                  }}
                />
                <button type="button" className="btn btn-outline-primary" onClick={addInclusion}>
                  Add
                </button>
              </div>
              <div className="d-flex flex-wrap gap-2">
                {(form.inclusions ?? []).map((item, idx) => (
                  <span key={idx} className="badge text-bg-primary d-inline-flex align-items-center gap-2">
                    {item}
                    <button
                      type="button"
                      className="btn btn-sm btn-link p-0 text-white text-decoration-none"
                      onClick={() => setForm((prev) => ({ ...prev, inclusions: prev.inclusions.filter((_, i) => i !== idx) }))}
                      aria-label="Remove inclusion"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              {!form.inclusions?.length && <div className="text-secondary small">No inclusions added.</div>}
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white">
              <div className="fw-semibold">Exclusions</div>
            </div>
            <div className="card-body">
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  value={newExclusion}
                  onChange={(e) => setNewExclusion(e.target.value)}
                  placeholder="Add exclusion..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addExclusion();
                    }
                  }}
                />
                <button type="button" className="btn btn-outline-primary" onClick={addExclusion}>
                  Add
                </button>
              </div>
              <div className="d-flex flex-wrap gap-2">
                {(form.exclusions ?? []).map((item, idx) => (
                  <span key={idx} className="badge text-bg-secondary d-inline-flex align-items-center gap-2">
                    {item}
                    <button
                      type="button"
                      className="btn btn-sm btn-link p-0 text-white text-decoration-none"
                      onClick={() => setForm((prev) => ({ ...prev, exclusions: prev.exclusions.filter((_, i) => i !== idx) }))}
                      aria-label="Remove exclusion"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              {!form.exclusions?.length && <div className="text-secondary small">No exclusions added.</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
