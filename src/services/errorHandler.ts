import * as expressIpFilter from 'express-ipfilter';
import ApplicationError from '../exceptions/applicationError';

export default (err, req, res, next) => {
  if (!err) {
    return next();
  }
  if(err instanceof ApplicationError){
    return res.status(err.status).json({errors: err.buildErrors()})
  }
  if (err instanceof expressIpFilter.IpDeniedError) {
    return res.status(401).json({ message: 'You are not allowed to access' });
  }
  console.log('Internal server error', err.message);
  return res.status(500).json({errors: ['Internal server error!']});
};
