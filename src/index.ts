import * as express from 'express';
import * as bodyParser from 'body-parser';

import ItemsController from './controllers/itemsController';

const app = express()

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/items', ItemsController.post)
app.listen(3000, () => console.log('App listening on port 3000!'))
