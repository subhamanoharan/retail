import {IUser} from '../interfaces';
import ForbiddenException from '../exceptions/forbiddenException';
import constants from '../constants';

export default (req, res, next) => {
  const user: IUser = req.user;
  if(constants.ROLES.ADMIN === user.role) return next();
  return next(new ForbiddenException());
};
