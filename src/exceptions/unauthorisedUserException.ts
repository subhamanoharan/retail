import ApplicationError from './applicationError';
import constants from '../constants';

const {USER_ROUTE_ERRORS} = constants
export default class UnauthorisedUserException extends ApplicationError {
  constructor(){
    super(USER_ROUTE_ERRORS.UNAUTHORISED, 401);
  }
}
