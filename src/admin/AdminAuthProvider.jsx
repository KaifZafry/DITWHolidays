import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { adminLogin, adminLogout, adminMe } from '../services/auth';

const AdminAuthContext = createContext(null);

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}

export default function AdminAuthProvider({ children }) {
  const [status, setStatus] = useState('loading'); // loading | authed | guest
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    (async () => {
      setStatus('loading');
      setError('');
      try {
        const me = await adminMe();
        if (!active) return;
        setUser(me ?? null);
        setStatus(me ? 'authed' : 'guest');
      } catch {
        if (!active) return;
        setUser(null);
        setStatus('guest');
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(() => {
    const login = async (username, password) => {
      setError('');
      const u = await adminLogin(username, password);
      setUser(u ?? { username });
      setStatus('authed');
      return u;
    };

    const logout = async () => {
      setError('');
      try {
        await adminLogout();
      } finally {
        setUser(null);
        setStatus('guest');
      }
    };

    return { status, user, error, setError, login, logout };
  }, [status, user, error]);

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

