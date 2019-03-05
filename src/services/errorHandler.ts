import InvalidItemException from '../exceptions/invalidItemException';

export default (err, req, res, next) => {
  if (!err) {
    return next();
  }
  if(err instanceof InvalidItemException){
    return res.status(err.status).json({errors: err.buildErrors()})
  }
  return res.status(500).json({errors: ['Internal server error!']});
};
