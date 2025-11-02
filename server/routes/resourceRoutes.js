import express from 'express';
import {
  createResource,
  getAllResources,
  getResourceById,
  deleteResource
} from '../controllers/resourceController.js';
import { authMiddleware } from '../config/authMiddleware.js';

const router = express.Router();

// Allow resource creation without auth (since no database)
router.post('/', createResource);
router.get('/', getAllResources);
router.get('/:id', getResourceById);
router.delete('/:id', authMiddleware, deleteResource);

export default router;

