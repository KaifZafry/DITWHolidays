import crypto from 'crypto';

function base64UrlEncode(input) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(String(input));
  return buf
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function base64UrlDecodeToString(input) {
  const normalized = String(input).replace(/-/g, '+').replace(/_/g, '/');
  const pad = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4));
  return Buffer.from(normalized + pad, 'base64').toString('utf8');
}

function hmacSha256Base64Url(data, secret) {
  return crypto.createHmac('sha256', secret).update(data).digest('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export function signAdminToken(payload) {
  const secret = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET;
  if (!secret) throw new Error('ADMIN_JWT_SECRET is missing in environment variables');

  const ttlSeconds = Number(process.env.ADMIN_TOKEN_TTL || 60 * 60 * 24);
  const now = Math.floor(Date.now() / 1000);
  const exp = now + (Number.isFinite(ttlSeconds) ? ttlSeconds : 60 * 60 * 24);

  const header = { alg: 'HS256', typ: 'JWT' };
  const body = { ...payload, iat: now, exp };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedBody = base64UrlEncode(JSON.stringify(body));
  const unsigned = `${encodedHeader}.${encodedBody}`;
  const signature = hmacSha256Base64Url(unsigned, secret);
  return `${unsigned}.${signature}`;
}

export function verifyAdminToken(token) {
  const secret = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET;
  if (!secret) throw new Error('ADMIN_JWT_SECRET is missing in environment variables');

  const parts = String(token || '').split('.');
  if (parts.length !== 3) return null;

  const [encodedHeader, encodedBody, signature] = parts;
  const unsigned = `${encodedHeader}.${encodedBody}`;
  const expectedSig = hmacSha256Base64Url(unsigned, secret);
  const a = Buffer.from(expectedSig);
  const b = Buffer.from(signature);
  if (a.length !== b.length) return null;
  if (!crypto.timingSafeEqual(a, b)) return null;

  let payload;
  try {
    payload = JSON.parse(base64UrlDecodeToString(encodedBody));
  } catch {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  if (payload?.exp && now >= Number(payload.exp)) return null;
  return payload;
}
