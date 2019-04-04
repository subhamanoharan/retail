import * as express from 'express';

import UsersController from './../controller/usersController';

const usersRouter = express.Router();

usersRouter.post('/authenticate', UsersController.login);
usersRouter.post('/logout', UsersController.logout);
usersRouter.get('/me', UsersController.get);

export default usersRouter;
