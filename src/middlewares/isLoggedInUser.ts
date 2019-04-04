import {IUserSession} from '../interfaces';
import ForbiddenException from '../exceptions/forbiddenException';

export default (req, res, next) => {
  const userInSession: IUserSession = req.session.user;
  const {userId} = req.params;
  if(userInSession.id != userId) return next(new ForbiddenException());
  return next();
};
