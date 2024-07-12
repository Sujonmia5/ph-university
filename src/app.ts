/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/api/v1', router);

app.get('/', async (req: Request, res: Response) => {
  // Promise.reject();
  res.send('hello world');
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
