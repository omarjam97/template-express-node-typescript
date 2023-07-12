import { iController } from './interfaces/iController.interface';
import App from './App';
import dotenv from 'dotenv';
import { envValidation } from './validation/envValidation';
import homeController from './controllers/home.controller';

dotenv.config();
envValidation();

const Controllers: iController[] = [new homeController()];

const app: App = new App(Controllers, 5000);

app.listen();
