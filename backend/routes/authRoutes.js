import express from 'express';
import { login, logout } from '../controllers/authController.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', requireAdmin, (req, res) => res.status(200).json({ success: true, user: req.admin }));

export default router;

