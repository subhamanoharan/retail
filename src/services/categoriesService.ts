import * as CategoriesRepo from '../repositories/categoriesRepo';
import InvalidCategoryException from './../exceptions/invalidCategoryException';
import categoryValidator from './validators/category/categoryValidator';
import categoryFormatter from './categoryFormatter';

const create = async (category) => {
  const categoryToCreate = categoryFormatter(category);
  return categoryValidator.validate(categoryToCreate)
    .then(() => CategoriesRepo.insert(categoryToCreate)
      .catch((err) => Promise.reject(new InvalidCategoryException(err.message))))
    .then(id => id)
};

const update = async (categoryId, category) => {
  const {name} = category;
  const formattedCategory = categoryFormatter({name})
  return categoryValidator.validate(formattedCategory, categoryId)
    .then(() => CategoriesRepo.update(categoryId, formattedCategory)
      .catch((err) => Promise.reject(new InvalidCategoryException(err.message))))
}

const all = () => CategoriesRepo.all()
  .then(categories => categories.map(({id, name}) => ({id, name})));

const remove = (itemId) => CategoriesRepo.remove(itemId);

export default {create, all, remove, update };
