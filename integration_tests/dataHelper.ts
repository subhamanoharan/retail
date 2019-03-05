import * as P from 'bluebird';
import * as itemsRepo from '../src/repositories/itemsRepo';

export const setUpItems = (items) =>
  P.mapSeries(items, i => itemsRepo.insert({name: i.name, barcode: i.barcode, sp: i.sp}));

export const tearDownItems = () => itemsRepo.deleteAll();
