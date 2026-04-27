import crypto from 'crypto';
import { buildCookie } from '../utils/cookies.js';
import { signAdminToken } from '../utils/token.js';

function safeEqual(a, b) {
  const aa = Buffer.from(String(a ?? ''));
  const bb = Buffer.from(String(b ?? ''));
  if (aa.length !== bb.length) return false;
  return crypto.timingSafeEqual(aa, bb);
}

export async function login(req, res, next) {
  try {
    const { username, password } = req.body ?? {};
    const expectedUser = process.env.ADMIN_USERNAME;
    const expectedPass = process.env.ADMIN_PASSWORD;

    if (!expectedUser || !expectedPass) {
      return res.status(500).json({ success: false, message: 'Admin credentials are not configured on the server' });
    }

    if (!safeEqual(username, expectedUser) || !safeEqual(password, expectedPass)) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    const token = signAdminToken({ username: expectedUser });
    const ttlSeconds = Number(process.env.ADMIN_TOKEN_TTL || 60 * 60 * 24);
    const maxAge = Number.isFinite(ttlSeconds) ? ttlSeconds : 60 * 60 * 24;

    res.setHeader(
      'Set-Cookie',
      buildCookie('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        maxAge,
      }),
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: { username: expectedUser },
    });
  } catch (err) {
    return next(err);
  }
}

export async function logout(req, res, next) {
  try {
    res.setHeader(
      'Set-Cookie',
      buildCookie('admin_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        maxAge: 0,
      }),
    );
    return res.status(200).json({ success: true, message: 'Logged out' });
  } catch (err) {
    return next(err);
  }
}

export async function me(req, res, next) {
  try {
    const token = req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.slice('Bearer '.length).trim()
      : null;

    if (token) {
      return res.status(400).json({ success: false, message: 'Use cookie-based session for /api/auth/me' });
    }

    // Cookie-based auth is handled by requireAdmin; this endpoint stays public and returns 401 when not logged in.
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  } catch (err) {
    return next(err);
  }
}
