import { api } from './api';

function unwrap(result) {
  return result && typeof result === 'object' && 'user' in result ? result.user : result;
}

export async function adminMe() {
  const res = await api.get('/api/auth/me');
  return unwrap(res);
}

export async function adminLogin(username, password) {
  const res = await api.post('/api/auth/login', { username, password });
  return unwrap(res);
}

export async function adminLogout() {
  return api.post('/api/auth/logout', {});
}

