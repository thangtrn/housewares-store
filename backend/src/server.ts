import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { CREDENTIALS, LOG_FORMAT, NODE_ENV, ORIGIN, PORT } from '~/config';
import { logger, stream } from '~/utils/logger';

class App {
   protected app: Application;
   protected env: string;
   protected port: string | number;

   constructor() {
      this.app = express();
      this.env = NODE_ENV || 'development';
      this.port = PORT || 5000;

      this.initializeMiddlewares();
      this.initializeRoutes();
      this.initializeSwagger();
      this.initializeErrorHandling();
   }

   private initializeMiddlewares = () => {
      this.app.use(morgan(LOG_FORMAT, { stream }));
      this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
      this.app.use(helmet());
      this.app.use(compression());
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(cookieParser());
   };

   private initializeRoutes = () => {
      this.app.get('/', (req, res) => {
         res.send('Hallo');
      });
   };

   private initializeSwagger = () => {};

   private initializeErrorHandling = () => {};

   public listen = () => {
      this.app.listen(this.port, () => {
         logger.info(`=================================`);
         logger.info(`======= ENV: ${this.env} =======`);
         logger.info(`🚀 App listening on the port ${this.port}`);
         logger.info(`=================================`);
      });
   };
}

const app = new App();

app.listen();
