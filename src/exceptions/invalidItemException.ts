import ApplicationError from './applicationError';

export default class InvalidItemException extends ApplicationError {
  constructor(message){
    super(message || 'Invalid Item!', 400);
  }
}
