import * as express from 'express';
import ItemsRouter from './itemsRoutes';
import UsersRouter from './usersRoutes';
import CategoriesRouter from './categoriesRoutes';
import sessionChecker from '../middlewares/sessionChecker';

const apiRouter = express.Router();

apiRouter.use(sessionChecker);
apiRouter.use('/items', ItemsRouter);
apiRouter.use('/users', UsersRouter);
apiRouter.use('/categories', CategoriesRouter);

export default apiRouter;
