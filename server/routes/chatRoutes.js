import express from 'express';
import { getMessages, getHobbies } from '../controllers/chatController.js';

const router = express.Router();

router.get('/hobbies', getHobbies);
router.get('/:hobby', getMessages);

export default router;

