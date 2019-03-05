import * as ItemsRepo from '../repositories/itemsRepo';
import InvalidItemException from './../exceptions/invalidItemException';

const create = ({name, barcode, sp}) =>
  ItemsRepo.insert({name, barcode, sp})
    .then(id => id)
    .catch((err) => Promise.reject(new InvalidItemException(err.message)));

const all = () => ItemsRepo.all()
  .then(items => items.map(({id, name, barcode, sp}) => ({id, name, barcode, sp})));

export default {create, all};
