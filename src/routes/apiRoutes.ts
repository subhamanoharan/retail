import * as express from 'express';
import ItemsRouter from './itemsRoutes';
import UsersRouter from './usersRoutes';
import sessionChecker from '../middlewares/sessionChecker';

const apiRouter = express.Router();

apiRouter.use('/items', ItemsRouter);
apiRouter.use('/users', sessionChecker, UsersRouter);

export default apiRouter;
