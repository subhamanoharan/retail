import * as express from 'express';

import CategoriesController from './../controller/categoriesController';
import isAdmin from './../middlewares/isAdmin';

const categoriesRouter = express.Router();

categoriesRouter.get('/', CategoriesController.all);
categoriesRouter.post('/', isAdmin, CategoriesController.create);
categoriesRouter.put('/:categoryId', isAdmin, CategoriesController.update);
categoriesRouter.delete('/:categoryId', isAdmin, CategoriesController.remove);

export default categoriesRouter;
