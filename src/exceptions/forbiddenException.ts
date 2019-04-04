import ApplicationError from './applicationError';
import constants from '../constants';

const {USER_ROUTE_ERRORS} = constants
export default class ForbiddenException extends ApplicationError {
  constructor(){
    super(USER_ROUTE_ERRORS.FORBIDDEN, 403);
  }
}
