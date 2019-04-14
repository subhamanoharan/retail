import * as ItemsRepo from '../repositories/itemsRepo';
import InvalidItemException from './../exceptions/invalidItemException';
import itemValidator from './validators/item/itemValidator';
import itemFormatter from './itemFormatter';

const create = async (item) => {
  const {name, barcode, sp, byWeight, category} = item;
  const formattedItem = itemFormatter({name, barcode, sp, byWeight, category})
  return itemValidator.validate(formattedItem)
    .then(() => ItemsRepo.insert(formattedItem)
      .catch((err) => Promise.reject(new InvalidItemException(err.message))))
    .then(id => id)
}

const update = async (itemId, item) => {
  const {name, barcode, sp} = item;
  const formattedItem = itemFormatter({name, barcode, sp})
  return itemValidator.validate(formattedItem, itemId)
    .then(() => ItemsRepo.update(itemId, formattedItem)
      .catch((err) => Promise.reject(new InvalidItemException(err.message))))
}

const all = () => ItemsRepo.all()
  .then(items => items.map(({id, name, barcode, sp}) => ({id, name, barcode, sp})));

const remove = (itemId) => ItemsRepo.remove(itemId);

export default {create, all, remove, update};
