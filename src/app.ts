import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';

import ItemsRouter from './routes/itemsRoutes';
import errorHandler from './services/errorHandler';
import cors from './middlewares/cors';

const app = express()

app.use(bodyParser.json());
app.use(cors);

app.use(express.static(path.join(__dirname, '../retail-frontend/dist')));
app.use(express.static(path.join(__dirname, '../retail-frontend/public')));

app.use('/items', ItemsRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'../retail-frontend/public/index.html'));
});

app.use(errorHandler);

export default app;
