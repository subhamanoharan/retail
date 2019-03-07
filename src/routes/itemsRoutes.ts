import * as express from 'express';

import ItemsController from '../controllers/itemsController';

const itemsRouter = express.Router();

itemsRouter.post('/', ItemsController.create);
itemsRouter.get('/', ItemsController.all);
itemsRouter.put('/:itemId', ItemsController.update);
itemsRouter.delete('/:itemId', ItemsController.remove);

export default itemsRouter;
