import * as express from 'express';
import * as bodyParser from 'body-parser';

import ItemsRouter from './routes/itemsRoutes';
import errorHandler from './services/errorHandler';
import cors from './middlewares/cors';

const app = express()

app.use(bodyParser.json());
app.use(cors);

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/items', ItemsRouter);
app.use(errorHandler);

export default app;
