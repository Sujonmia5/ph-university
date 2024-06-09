import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/modules/middleware/globalErrorHandler';
import notFound from './app/modules/middleware/notFound';
import router from './app/modules/routes';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

app.get('/', async (req: Request, res: Response) => {
  res.send('hello world');
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
