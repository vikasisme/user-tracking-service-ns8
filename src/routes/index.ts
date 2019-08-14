import { Router, Response, Request, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

import { DataStore } from '../lib/dataStore';
import { User } from '../models/user';
import { Event } from '../models/event';
import { SuccessOK, SuccessCreated, APIResponse } from '../models/response';

const router = Router();

/**
 * user routes
 */

 // :post new user
router.post('/user',[
    check('email').exists().withMessage('email is required')
        .isEmail().withMessage('enter valid email')
        .custom( async(value): Promise<void> => {
        const emailFound = await DataStore.emailExist(value);
        if(emailFound){
            throw new Error("user already exists");
        }
    }), 
    check('password').exists().withMessage('password is required'),
    check('phone').optional().matches(/^\d{3}-\d{3}-\d{4}$/).withMessage('phone format: ###-###-####')],
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const errors = await validationResult(req);
            
            if(!errors.isEmpty()){
                throw new Error(`Request Error - ${errors['errors'][0].msg}`);
            }
            const { email, password, phone } = req.body;
            const userId: number = await DataStore.postUser(email, password, phone);
            const response: APIResponse = new SuccessCreated({ userId });
            res.status(response.statusCode).json(response);
        } catch (e) {
            next(e);
        }
    }
);

// :get all users
router.get('/users', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users: User[] = await DataStore.getUsers();
        const response: APIResponse = new SuccessOK(users);
        res.status(response.statusCode).send(response);
    } catch (e) {
        next(e);
    }
});

// :get user by id
router.get('/user/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId: number = req.params.id as number;
        const user: User = await DataStore.getUserById(userId);
        const response : APIResponse = new SuccessOK(user);
        res.status(response.statusCode).send(response);
    } catch (e) {
        next(e);
    }
});


// :post events to a user id
router.post('/user/:id/events', [
    check('type').exists().withMessage('type is required'),
    check('created').optional().matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/).withMessage('date format: YYYY-MM-DD')],
    async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
        try {
            const errors = await validationResult(req);

            if(!errors.isEmpty()){
                throw new Error(`Request Error - ${errors['errors'][0].msg}`);
            }

            const userId: number = req.params.id as number;
            const { type, created } = req.body;
            const eventId: number = await DataStore.postEvent(userId, type, created ? new Date(created) : created);
            const response: APIResponse = new SuccessCreated({ eventId });
            res.status(response.statusCode).json(response);
        } catch (e) {
            next(e);
        }
    });

// :get events by user id
router.get('/user/:id/events', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const userId: number = req.params.id as number;
        const events: Event[] = await DataStore.getEventsByUserId(userId);
        const response: APIResponse = new SuccessOK(events);
        res.status(response.statusCode).json(response);
    }catch(e){
        next(e);
    }
});


/**
 * event routes
 */

 // :get all events for all users
router.get('/events', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const events: Event[] = await DataStore.getEvents();
        const response: APIResponse = new SuccessOK(events);
        res.status(response.statusCode).send(response);
    } catch(e){
        next(e);
    }
});

// :get all events for all users in the last day 
router.get('/events/last-day', async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const events: Event[] = await DataStore.getEventsByLastDay();
        const response: APIResponse = new SuccessOK(events);
        res.status(response.statusCode).send(response);
    } catch(e) {
        next(e);
    }
});

export default router; 