import * as express from 'express';

import ItemsController from '../controllers/itemsController';

const itemsRouter = express.Router();

itemsRouter.post('/', ItemsController.create);
itemsRouter.get('/', ItemsController.all);

export default itemsRouter;
