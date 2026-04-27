export function parseCookies(cookieHeader) {
  const header = String(cookieHeader || '');
  if (!header) return {};

  const out = {};
  for (const part of header.split(';')) {
    const [k, ...rest] = part.split('=');
    const key = k?.trim();
    if (!key) continue;
    const value = rest.join('=').trim();
    out[key] = decodeURIComponent(value);
  }
  return out;
}

export function buildCookie(name, value, options = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`];
  parts.push(`Path=${options.path || '/'}`);

  if (options.maxAge != null) parts.push(`Max-Age=${options.maxAge}`);
  if (options.httpOnly) parts.push('HttpOnly');
  if (options.secure) parts.push('Secure');
  if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);
  return parts.join('; ');
}

