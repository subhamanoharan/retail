import {IItem} from '../../../interfaces';
import categoryValidator from './categoryValidator';
import InvalidItemException from './../../../exceptions/invalidItemException';
import constants from '../../../constants';

const {ERRORS} = constants;

const validate = async (item: IItem) => {
  const isItemSoldByWeight = item.category && item.byWeight;
  if(isItemSoldByWeight)
    return categoryValidator(item);
  if(item.category && !item.byWeight)
    return Promise.reject(new InvalidItemException(ERRORS.CATEGORY_NOT_ALLOWED));
  if(item.byWeight && !item.category)
    return Promise.reject(new InvalidItemException(ERRORS.INVALID_CATEGORY));
  return Promise.resolve(true);
};


export default (item) =>
  validate(item)
    .then(() => true);
