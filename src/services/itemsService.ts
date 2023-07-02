import * as ItemsRepo from '../repositories/itemsRepo';
import InvalidItemException from './../exceptions/invalidItemException';
import itemValidator from './validators/item/itemValidator';
import itemFormatter from './itemFormatter';

const create = async (item) => {
  const {name, barcode, sp, byWeight, category, tax_percent} = item;
  const formattedItem = itemFormatter({name, barcode, sp, byWeight, category, tax_percent})
  return itemValidator.validate(formattedItem)
    .then(() => ItemsRepo.insert(formattedItem)
      .catch((err) => Promise.reject(new InvalidItemException(err.message))))
    .then(id => id)
}

const update = async (itemId, item) => {
  const {name, barcode, sp, byWeight, category, tax_percent} = item;
  const formattedItem = itemFormatter({name, barcode, sp, byWeight, category, tax_percent})
  return itemValidator.validate(formattedItem, itemId)
    .then(() => ItemsRepo.update(itemId, formattedItem)
      .catch((err) => Promise.reject(new InvalidItemException(err.message))))
}

const all = () => ItemsRepo.all()
  .then(items => items.map(({id, name, barcode, sp, by_weight, category, tax_percent}) =>
    ({id, name, barcode, sp, tax_percent, ...(by_weight ? {byWeight: by_weight, category} : {})})));

const remove = (itemId) => ItemsRepo.remove(itemId);

export default {create, all, remove, update};
