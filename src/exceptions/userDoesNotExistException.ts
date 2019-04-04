import ApplicationError from './applicationError';
import constants from '../constants';

const {USER_ROUTE_ERRORS} = constants
export default class UserDoesNotExistException extends ApplicationError {
  constructor(){
    super(USER_ROUTE_ERRORS.USER_NOT_FOUND, 404);
  }
}
