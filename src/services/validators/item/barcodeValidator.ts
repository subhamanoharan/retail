import * as _ from 'lodash';

import * as ItemsRepo from '../../../repositories/itemsRepo';
import InvalidItemException from './../../../exceptions/invalidItemException';
import constants from '../../../constants';

const {ERRORS} = constants;

const validateType = ({barcode}) => _.isString(barcode) ? Promise.resolve(true) :
  Promise.reject(new InvalidItemException(ERRORS.INVALID_BARCODE));

const isBarcodeDuplicate = async(item, currentItemId: string) => {
  const itemId = await ItemsRepo.getItemIdForBarcode(item.barcode);
  const isBarcodeUnique = !itemId || Number(currentItemId) === itemId;
  return isBarcodeUnique ? Promise.resolve() :
    Promise.reject(new InvalidItemException(ERRORS.BARCODE_EXISTS(item)));
}

export default (item, itemId?: string) =>
  validateType(item)
    .then(() => isBarcodeDuplicate(item, itemId))
    .then(() => true);
