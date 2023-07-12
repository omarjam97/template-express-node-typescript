import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/Http.exception';

const ErrorHandler = (
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const status: number = error.status || 500;
    const message: string =
        error.message || 'Something Went Wrong Please Try Later';
    const details: object = error.details;
    return res.status(status).send({
        status,
        message,
        details,
    });
};

export default ErrorHandler;
