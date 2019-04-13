import ApplicationError from '../exceptions/applicationError';

export default (err, req, res, next) => {
  if (!err) {
    return next();
  }
  if(err instanceof ApplicationError){
    return res.status(err.status).json({errors: err.buildErrors()})
  }
  console.log('Internal server error', err.message);
  return res.status(500).json({errors: ['Internal server error!']});
};
