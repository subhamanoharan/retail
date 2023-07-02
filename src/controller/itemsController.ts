import itemsService from './../services/itemsService';

const create = (req, res, next) => {
  const {name, barcode, sp, byWeight, category, tax_percent} = req.body;
  return itemsService.create({name, barcode, sp, byWeight, category, tax_percent})
    .then(id => res.json({id}))
    .catch(e => next(e));
};

const all = (req, res) => itemsService.all().then(items => res.json(items));

const remove = (req, res) => {
  const {itemId} = req.params;
  return itemsService.remove(itemId)
    .then(() => res.send());
}

const update = (req, res, next) => {
  const {name, barcode, sp, byWeight, category, tax_percent} = req.body;
  const { itemId } = req.params;
  return itemsService.update(itemId, {name, barcode, sp, byWeight, category, tax_percent})
    .then(() => res.send())
    .catch(error => next(error));
};

export default {create, all, remove, update};
