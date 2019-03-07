import * as ItemsRepo from '../repositories/itemsRepo';
import InvalidItemException from './../exceptions/invalidItemException';
import itemValidator from './validators/itemValidator';

const create = async (item) => {
  const {name, barcode, sp} = item;
  return itemValidator.validate(item)
    .then(() => ItemsRepo.insert({name, barcode, sp})
      .catch((err) => Promise.reject(new InvalidItemException(err.message))))
    .then(id => id)
}

const update = async (itemId, item) => {
  const {name, barcode, sp} = item;
  return itemValidator.validate(item, itemId)
    .then(() => ItemsRepo.update(itemId, {name, barcode, sp})
      .catch((err) => Promise.reject(new InvalidItemException(err.message))))
}

const all = () => ItemsRepo.all()
  .then(items => items.map(({id, name, barcode, sp}) => ({id, name, barcode, sp})));

const remove = (itemId) => ItemsRepo.remove(itemId);

export default {create, all, remove, update};
