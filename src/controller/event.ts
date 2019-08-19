import { Request, Response, NextFunction } from 'express';
import { check, validationResult, ValidationChain } from 'express-validator';
import { APIResponse, SuccessCreated, SuccessOK } from '../models/response';
import { DataStore } from '../lib/dataStore';
import { Event } from '../models/event';


export class EventController {
    public static createEventValidator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await check('type').exists().withMessage('type is required').run(req);
        await check('created').optional().matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/).withMessage('date format: YYYY-MM-DD').run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            next(new Error(`Request Error - ${errors['errors'][0].msg}`));
        } else {
            next();
        }
    };

    public static createEventController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const errors = await validationResult(req);

            if (!errors.isEmpty()) {
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
    };

    public static getEventsByUserIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId: number = req.params.id as number;
            const events: Event[] = await DataStore.getEventsByUserId(userId);
            const response: APIResponse = new SuccessOK(events);
            res.status(response.statusCode).json(response);
        } catch (e) {
            next(e);
        }
    };

    public static getAllEventsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const events: Event[] = await DataStore.getEvents();
            const response: APIResponse = new SuccessOK(events);
            res.status(response.statusCode).send(response);
        } catch (e) {
            next(e);
        }
    };

    public static getLastDayEventsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const events: Event[] = await DataStore.getEventsByLastDay();
            const response: APIResponse = new SuccessOK(events);
            res.status(response.statusCode).send(response);
        } catch (e) {
            next(e);
        }
    }
}