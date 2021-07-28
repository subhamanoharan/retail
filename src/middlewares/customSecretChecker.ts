import * as config from 'config';

import UnauthorisedDeviceException from '../exceptions/unauthorisedDeviceException';

const unauthorisedDeviceException = new UnauthorisedDeviceException();

export default (req, res, next) => {
  const sendUnauthorizedResponse = () => next(unauthorisedDeviceException);

  const deviceCode: String = req.headers.devicecode || '';
  if(deviceCode !== config.DEVICE_CODE) return sendUnauthorizedResponse();
  return next();
}
