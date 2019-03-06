import * as _ from 'lodash';

import * as ItemsRepo from '../../repositories/itemsRepo';
import InvalidItemException from './../../exceptions/invalidItemException';
import constants from '../../constants';

const {ERRORS} = constants;

const validateType = ({barcode}) => _.isString(barcode) ? Promise.resolve(true) :
  Promise.reject(new InvalidItemException(ERRORS.INVALID_BARCODE));

const doesBarcodeExist = async(item) => {
  const doesBarcodeExist = await ItemsRepo.doesBarcodeExist(item);
  return doesBarcodeExist ? Promise.reject(new InvalidItemException(ERRORS.BARCODE_EXISTS(item)))
    : Promise.resolve();
}

export default (item) =>
  validateType(item)
    .then(() => doesBarcodeExist(item))
    .then(() => true);
