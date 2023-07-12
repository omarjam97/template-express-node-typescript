import { Router } from 'express';

export interface iController {
    readonly path: string;
    readonly router: Router;
}
