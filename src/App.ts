import { NextFunction } from 'express';
import { iController } from './interfaces/iController.interface';
import express, { Application, Response, Request } from 'express';
import logger from './utils/logger';
import ErrorHandler from './middlewares/Error.middleware';
import HttpException from './exceptions/Http.exception';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import mongoose from 'mongoose';

class App {
    public app: Application = express();
    public version: string = 'v1';

    constructor(
        readonly Controllers: iController[],
        readonly Port: number,
    ) {
        this.initMiddlewaress();
        this.initDatabase();
        this.initControllers();

        this.initErrorHandlers();
    }

    /**
     * This function needs to be called after the initControllers function
     */
    private initErrorHandlers() {
        this.app.use(ErrorHandler);
    }

    private initMiddlewaress() {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    private initControllers() {
        this.Controllers.forEach((controller: iController) => {
            this.app.use('/api/v1/' + controller.path, controller.router);
        });
    }

    private async initDatabase() {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

        try {
            await mongoose.connect(
                `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`,
            );
        } catch (e) {
            logger.error('Something Went Wrong With the database');
            logger.error(e);
            process.exit(1);
        }
    }

    public listen() {
        this.app.listen(this.Port, () => {
            logger.info(`Server Start On PORT : ${this.Port}`);
        });
    }
}

export default App;
