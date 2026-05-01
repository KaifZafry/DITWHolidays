import express from 'express';
import {
  createPackage,
  deletePackage,
  getAllPackages,
  getPackageById,
  uploadPackageImage,
  updatePackage,
} from '../controllers/packageController.js';
import { requireAdmin } from '../middleware/adminAuth.js';
import { uploadPackageImage as packageImageUpload } from '../middleware/upload.js';

const router = express.Router();

router.post('/upload-image', requireAdmin, packageImageUpload.single('image'), uploadPackageImage);
router.route('/').post(requireAdmin, createPackage).get(getAllPackages);
router.route('/:id').get(getPackageById).put(requireAdmin, updatePackage).delete(requireAdmin, deletePackage);

export default router;
