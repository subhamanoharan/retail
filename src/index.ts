import * as express from 'express';
import * as bodyParser from 'body-parser';

import ItemsRouter from './routes/itemsRoutes';

const app = express()

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/items', ItemsRouter);
app.listen(3000, () => console.log('App listening on port 3000!'))
