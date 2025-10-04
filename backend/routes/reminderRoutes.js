import express from 'express';
import { createReminder, getRemindersByApp} from '../controllers/reminderController.js';

const router = express.Router();

router.get('/reminder/:appId', getRemindersByApp);

router.post('/add', createReminder);


export default router;
