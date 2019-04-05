import ApplicationError from './applicationError';
import constants from '../constants';

const {USER_ROUTE_ERRORS} = constants
export default class UserDbException extends ApplicationError {
  constructor(message){
    super(message, 400);
  }
}
