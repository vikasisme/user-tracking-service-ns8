import { Router } from 'express';
import { UserController } from '../controller/user';
import { EventController } from '../controller/event';

const router = Router();

router.post('/user', UserController.createUserValidator, UserController.createUserController);
router.get('/user', UserController.getUserController);
router.get('/user/:id', UserController.getUserByIDController);

router.post('/user/:id/event', EventController.createEventValidator, EventController.createEventController);
router.get('/user/:id/event', EventController.getEventsByUserIdController);
router.get('/event', EventController.getAllEventsController);
router.get('/event/last-day', EventController.getLastDayEventsController);

export default router; 