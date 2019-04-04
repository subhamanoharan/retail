import * as lodash from 'lodash';
import {IUserSession} from '../interfaces';
import usersService from './../services/usersService';
import UnauthorisedUserException from '../exceptions/unauthorisedUserException';
import constants from '../constants';

const unauthorisedUserException = new UnauthorisedUserException();

export default async (req, res, next) => {
  const sendUnauthorizedResponse = () => next(unauthorisedUserException);

  const openRoutes = constants.OPEN_ROUTES;
  if(openRoutes.find(r => r === req.originalUrl)){
    return next();
  }
  const userInSession: IUserSession = req.session.user;
  if(lodash.isEmpty(userInSession)) return sendUnauthorizedResponse();
  return usersService.findById(userInSession.id)
    .then((userFound) => req.user = userFound)
    .then(() => next())
    .catch(sendUnauthorizedResponse);
}
