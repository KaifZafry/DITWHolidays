import express from 'express';
import {
  createPackage,
  deletePackage,
  getAllPackages,
  getPackageById,
  updatePackage,
} from '../controllers/packageController.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

router.route('/').post(requireAdmin, createPackage).get(getAllPackages);
router.route('/:id').get(getPackageById).put(requireAdmin, updatePackage).delete(requireAdmin, deletePackage);

export default router;
