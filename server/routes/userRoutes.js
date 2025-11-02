import express from 'express';
import { updateHobbies } from '../controllers/userController.js';
import { authMiddleware } from '../config/authMiddleware.js';

const router = express.Router();

router.put('/hobbies', authMiddleware, updateHobbies);

export default router;

