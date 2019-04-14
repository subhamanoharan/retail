import * as _ from 'lodash';

import * as CategoriesRepo from '../../../repositories/categoriesRepo';
import InvalidItemException from './../../../exceptions/invalidItemException';
import constants from '../../../constants';
import {IItem} from '../../../interfaces';

const {ERRORS} = constants;

const isItemSoldByWeight = async(item: IItem) => item.byWeight ? Promise.resolve() :
    Promise.reject(new InvalidItemException(ERRORS.CATEGORY_NOT_ALLOWED));

const doesCategoryExist = async(item: IItem) => {
  const categoryId = await CategoriesRepo.getId({name: item.category});
  return categoryId ? Promise.resolve() :
    Promise.reject(new InvalidItemException(ERRORS.INVALID_CATEGORY));
}

export default (item) =>
  doesCategoryExist(item)
    .then(() => true);
