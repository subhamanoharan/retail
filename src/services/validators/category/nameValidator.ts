import * as _ from 'lodash';

import * as CategoriesRepo from '../../../repositories/categoriesRepo';
import InvalidCategoryException from './../../../exceptions/invalidCategoryException';
import constants from '../../../constants';

const {CATEGORY_ROUTE_ERRORS, ERRORS, NAME_MAX_LENGTH} = constants;

const validateLength = ({name}) => _.inRange(name.length, 1, NAME_MAX_LENGTH) ? Promise.resolve()
  : Promise.reject(new InvalidCategoryException(ERRORS.INVALID_NAME));

const validateUniqueness = async (category, currentCategoryId?) => {
  const categoryId = await CategoriesRepo.getId(category);
  const isCategoryUnique = !categoryId || Number(currentCategoryId) === categoryId;
  return isCategoryUnique ? Promise.resolve(true) :
    Promise.reject(new InvalidCategoryException(CATEGORY_ROUTE_ERRORS.CATEGORY_EXISTS(category)));
}

export default (category, currentCategoryId?) =>
  validateLength(category)
    .then(() => validateUniqueness(category, currentCategoryId))
    .then(() => true);
