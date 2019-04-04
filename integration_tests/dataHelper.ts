import * as P from 'bluebird';
import * as itemsRepo from '../src/repositories/itemsRepo';
import * as usersRepo from '../src/repositories/usersRepo';

export const setUpItems = (items) =>
  P.mapSeries(items, i => itemsRepo.insert({name: i.name, barcode: i.barcode, sp: i.sp}));

export const tearDownItems = () => itemsRepo.deleteAll();

export const setUpUsers = (users) =>
  P.mapSeries(users, u => usersRepo.create({name: u.name, password: u.password, role: u.role}));

export const tearDownUsers = (userIds) =>
  P.mapSeries(userIds, u => usersRepo.remove(u));
