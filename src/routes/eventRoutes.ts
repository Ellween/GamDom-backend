import express, { Router } from 'express';
import * as eventController from '../controllers/eventController';
import * as authController from '../controllers/authController';
import { authenticateJWT } from '../middleware/auth';

const router: Router = express.Router();

// if it would be necessery
router.post('/register', authController.register);

router.post('/login', authController.login);

// Because of Bonus Task i added Auth for events
router.get('/events', authenticateJWT, eventController.getEvents);

export default router;