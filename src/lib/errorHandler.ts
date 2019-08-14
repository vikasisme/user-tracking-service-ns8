import { RequestHandler, ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { NotFound, InternalServerError, BadRequest, APIResponse } from '../models/response';

export const urlNotFound: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    const err = new NotFound();
    res.status(err.statusCode).json(err);
};

export const routerErrorHandler: ErrorRequestHandler = (err:Error, req: Request, res: Response, next: NextFunction): void => {
    let errorResponse: APIResponse;
    if(err.message == 'user not found' || err.message == 'events not found'){
        errorResponse = new NotFound(err.message);
    } else if (err.message.includes('Request Error')){
        errorResponse = new BadRequest({message: err.message});
    } else {
        errorResponse = new InternalServerError(err.message);
    }
    res.status(errorResponse.statusCode).json(errorResponse);
}
