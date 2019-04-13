import ApplicationError from './applicationError';

export default class InvalidCategoryException extends ApplicationError {
  constructor(message){
    super(message || 'Invalid Category!', 400);
  }
}
