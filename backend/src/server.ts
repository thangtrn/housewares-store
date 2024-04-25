import 'reflect-metadata';
import 'express-async-errors';
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { CREDENTIALS, LOG_FORMAT, NODE_ENV, ORIGIN, PORT } from '~/config';
import connectMongodb from './config/db';
import controllerRegister from './utils/controllerRegister';
import UserController from './controllers/user.controller';
import { handleError } from './middlewares/handleError';
import cookie from 'cookie-parser';
import AuthController from './controllers/auth.controller';

class App {
   protected app: Application;
   protected env: string;
   protected port: string | number;

   constructor() {
      this.app = express();
      this.env = NODE_ENV || 'development';
      this.port = PORT || 5000;

      this.connection();
      this.initializeMiddlewares();
      this.initializeRoutes();
      this.initializeSwagger();
      this.initializeErrorHandling();
   }

   private connection = async () => {
      await connectMongodb();
   };

   private initializeMiddlewares = () => {
      this.app.use(morgan(LOG_FORMAT));
      this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
      this.app.use(helmet());
      this.app.use(compression());
      this.app.use(express.json());
      this.app.use(cookie());
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(cookieParser());
   };

   private initializeRoutes = () => {
      controllerRegister(this.app, [AuthController, UserController]);
   };

   private initializeSwagger = () => {};

   private initializeErrorHandling = () => {
      this.app.use(handleError.NotFound);
      this.app.use(handleError.InternalServer);
   };

   public listen = () => {
      this.app.listen(this.port, () => {
         console.log(`=================================`);
         console.log(`======= ENV: ${this.env} =======`);
         console.log(`🚀 App listening on the port ${this.port}`);
         console.log(`=================================`);
      });
   };
}

const app = new App();

app.listen();
