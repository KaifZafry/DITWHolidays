import { api } from './api';

function unwrap(result) {
  return result && typeof result === 'object' && 'data' in result ? result.data : result;
}

export async function getHealth() {
  return api.get('/health');
}

export async function listPackages() {
  const res = await api.get('/api/packages');
  return unwrap(res) ?? [];
}

export async function getPackage(id) {
  const res = await api.get(`/api/packages/${id}`);
  return unwrap(res);
}

export async function createPackage(payload) {
  const res = await api.post('/api/packages', payload);
  return unwrap(res);
}

export async function updatePackage(id, payload) {
  const res = await api.put(`/api/packages/${id}`, payload);
  return unwrap(res);
}

export async function deletePackage(id) {
  const res = await api.del(`/api/packages/${id}`);
  return unwrap(res);
}

