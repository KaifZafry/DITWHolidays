import { parseCookies } from '../utils/cookies.js';
import { verifyAdminToken } from '../utils/token.js';

export function requireAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const bearer = authHeader.startsWith('Bearer ') ? authHeader.slice('Bearer '.length).trim() : '';

    const cookies = parseCookies(req.headers.cookie);
    const token = bearer || cookies.admin_token;

    const payload = token ? verifyAdminToken(token) : null;
    if (!payload) return res.status(401).json({ success: false, message: 'Unauthorized' });

    req.admin = { username: payload.username };
    return next();
  } catch (err) {
    return next(err);
  }
}

