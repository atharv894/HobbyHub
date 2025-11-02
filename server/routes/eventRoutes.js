import express from 'express';
import {
  createEvent,
  getAllEvents,
  getEventById,
  joinEvent,
  leaveEvent
} from '../controllers/eventController.js';
import { authMiddleware } from '../config/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/:id/join', authMiddleware, joinEvent);
router.post('/:id/leave', authMiddleware, leaveEvent);

export default router;

