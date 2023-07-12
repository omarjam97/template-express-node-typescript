import { NextFunction } from 'express';
import { Request, Response, Router } from 'express';
import { iController } from './../interfaces/iController.interface';
import homeServices from '../services/home.service';
import requestMiddlware from '../middlewares/requestValidation.middleware';
import { createSchema } from '../schemas/User.schema';

class homeController implements iController {
    readonly path: string = 'home';
    readonly router: Router = Router();

    constructor() {
        this.router.get('/', this.index);
        this.router.post('/', requestMiddlware(createSchema), this.create);
    }

    private index(req: Request, res: Response, next: NextFunction) {
        homeServices.create('hello');
        return res.status(200).send('hello World');
    }

    private create(req: Request, res: Response, next: NextFunction) {
        homeServices.create('hello');
        return res.status(200).send('hello World');
    }
}

export default homeController;
