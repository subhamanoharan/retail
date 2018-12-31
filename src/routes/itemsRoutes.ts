import * as express from 'express';

import ItemsController from '../controllers/itemsController';

const itemsRouter = express.Router();

itemsRouter.post('/', ItemsController.post);

export default itemsRouter;
