import categoriesService from '../services/categoriesService';
import constants from '../constants';

const create = (req, res, next) => {
  const { name } = req.body;
  return categoriesService.create({ name })
    .then((id) => res.json({id}))
    .catch(error => next(error));
};

const update = (req, res, next) => {
  const { name } = req.body;
  return categoriesService.update(req.params.categoryId, { name })
    .then(() => res.send())
    .catch(error => next(error));
};

const remove = (req, res) =>
  categoriesService.remove(req.params.categoryId).then(() => res.send());

const all = (req, res) => categoriesService.all().then(categories => res.json(categories));

export default { create, update, all, remove };
