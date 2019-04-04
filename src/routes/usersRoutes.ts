import * as express from 'express';

import isLoggedInUser from './../middlewares/isLoggedInUser';
import UsersController from './../controller/usersController';

const usersRouter = express.Router();

usersRouter.post('/authenticate', UsersController.login);
usersRouter.post('/logout', UsersController.logout);
usersRouter.get('/me', UsersController.get);
usersRouter.delete('/:userId', isLoggedInUser, UsersController.remove);

export default usersRouter;
