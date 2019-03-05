export default class ApplicationError extends Error {
  status: number;
  constructor(message, status) {
    super();
    this.message = message || 'Something went wrong. Please try again.';
    this.status = status || 500;
  }

  buildErrors(){
    return [this.message];
  }
}
