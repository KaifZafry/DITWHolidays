import mongoose from 'mongoose';
import Package from '../models/Package.js';

export async function createPackage(req, res, next) {
  try {
    const created = await Package.create(req.body);
    return res.status(201).json({
      success: true,
      message: 'Package created successfully',
      data: created,
    });
  } catch (err) {
    return next(err);
  }
}

export async function getAllPackages(req, res, next) {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: packages.length,
      data: packages,
    });
  } catch (err) {
    return next(err);
  }
}

export async function getPackageById(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid package id' });
    }

    const pkg = await Package.findById(id);
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }

    return res.status(200).json({ success: true, data: pkg });
  } catch (err) {
    return next(err);
  }
}

export async function updatePackage(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid package id' });
    }

    const updated = await Package.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Package updated successfully',
      data: updated,
    });
  } catch (err) {
    return next(err);
  }
}

export async function deletePackage(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid package id' });
    }

    const deleted = await Package.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Package deleted successfully',
    });
  } catch (err) {
    return next(err);
  }
}

