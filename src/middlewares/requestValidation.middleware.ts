import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'yup';
import HttpException from '../exceptions/Http.exception';

const requestMiddlware =
    (Schema: AnySchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await Schema.validate(
                {
                    body: req.body,
                    query: req.query,
                    params: req.params,
                },
                {
                    abortEarly: false,
                },
            );
            return next();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            //logger.error(err);
            next(
                new HttpException(400, 'Validation Error', {
                    message: err.errors,
                }),
            );
        }
    };

export default requestMiddlware;
