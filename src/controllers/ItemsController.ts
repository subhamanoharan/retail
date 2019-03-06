import itemsService from '../services/itemsService';

const create = (req, res, next) => {
  const {name, barcode, sp} = req.body;
  return itemsService.create({name, barcode, sp})
    .then(id => res.json({id}))
    .catch(e => next(e));
};

const all = (req, res) => itemsService.all().then(items => res.json(items));

const remove = (req, res) => {
  const {itemId} = req.params;
  return itemsService.remove(itemId)
    .then(() => res.send());
}

export default {create, all, remove};
