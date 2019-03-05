import * as express from 'express';
import * as bodyParser from 'body-parser';

import ItemsRouter from './routes/itemsRoutes';
import errorHandler from './services/errorHandler';

const app = express()

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3001");
  next();
});

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/items', ItemsRouter);
app.use(errorHandler);

export default app;
