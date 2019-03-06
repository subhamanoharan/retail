import * as _ from 'lodash';

import InvalidItemException from './../../exceptions/invalidItemException';
import constants from '../../constants';

const {ERRORS, NAME_MAX_LENGTH} = constants;

const validateType = ({name}) =>_.isString(name) ? Promise.resolve(true) :
  Promise.reject(new InvalidItemException(ERRORS.INVALID_NAME));

const validateLength = ({name}) => _.inRange(name.length, 1, NAME_MAX_LENGTH) ? Promise.resolve()
  : Promise.reject(new InvalidItemException(ERRORS.INVALID_NAME));

export default (item) =>
  validateType(item)
    .then(() => validateLength(item))
    .then(() => true);
