import { Request, Response, NextFunction } from 'express';
import { validationResult, check } from 'express-validator';
import { APIResponse, SuccessCreated, SuccessOK } from '../models/response';
import { DataStore } from '../lib/dataStore';
import { User } from '../models/user';

export class UserController {
    public static createUserValidator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await check('email').exists().withMessage('email is required').isEmail().withMessage('enter valid email').custom(async (value): Promise<void> => {
            const emailFound = await DataStore.emailExist(value);
            if (emailFound) {
                throw new Error("user already exists");
            }
        }).run(req),
            await check('password').exists().withMessage('password is required').run(req),
            await check('phone').optional().matches(/^\d{3}-\d{3}-\d{4}$/).withMessage('phone format: ###-###-####').run(req)

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            next(new Error(`Request Error - ${errors['errors'][0].msg}`));
        } else {
            next();
        }
    };

    public static createUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email, password, phone } = req.body;
            const userId: number = await DataStore.postUser(email, password, phone);
            const response: APIResponse = new SuccessCreated({ userId });
            res.status(response.statusCode).json(response);
        } catch (e) {
            next(e);
        }
    };

    public static getUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const users: User[] = await DataStore.getUsers();
            const response: APIResponse = new SuccessOK(users);
            res.status(response.statusCode).send(response);
        } catch (e) {
            next(e);
        }
    };

    public static getUserByIDController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId: number = req.params.id as number;
            const user: User = await DataStore.getUserById(userId);
            const response: APIResponse = new SuccessOK(user);
            res.status(response.statusCode).send(response);
        } catch (e) {
            next(e);
        }
    };
}