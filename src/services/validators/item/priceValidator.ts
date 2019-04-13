import * as _ from 'lodash';

import InvalidItemException from './../../../exceptions/invalidItemException';
import constants from '../../../constants';

const {ERRORS} = constants;

const validateType = ({sp}) => _.isFinite(sp) ? Promise.resolve(true) :
  Promise.reject(new InvalidItemException(ERRORS.INVALID_PRICE));

const validateIfPositive = ({sp}) => sp > 0 ? Promise.resolve()
  : Promise.reject(new InvalidItemException(ERRORS.INVALID_PRICE));

export default (item) =>
  validateType(item)
    .then(() => validateIfPositive(item))
    .then(() => true);
