import * as express from 'express';

import isAdmin from './../middlewares/isAdmin';
import UsersController from './../controller/usersController';

const usersRouter = express.Router();

usersRouter.post('/authenticate', UsersController.login);
usersRouter.post('/logout', UsersController.logout);
usersRouter.get('/me', UsersController.get);
usersRouter.post('/', isAdmin, UsersController.create);
usersRouter.delete('/:userId', isAdmin, UsersController.remove);

export default usersRouter;
