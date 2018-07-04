import * as express from 'express';
import ItemsController from './controllers/ItemsController';
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/items', ItemsController.post)
app.listen(3000, () => console.log('Example app listening on port 3000!'))
