import * as express from 'express';

import ItemsController from './../controller/itemsController';
import isAdmin from './../middlewares/isAdmin';

const itemsRouter = express.Router();

itemsRouter.get('/', ItemsController.all);
itemsRouter.post('/', isAdmin, ItemsController.create);
itemsRouter.put('/:itemId', isAdmin, ItemsController.update);
itemsRouter.delete('/:itemId', isAdmin, ItemsController.remove);

export default itemsRouter;
