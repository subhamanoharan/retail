import * as P from 'bluebird';
import * as itemsRepo from '../src/repositories/itemsRepo';
import * as usersRepo from '../src/repositories/usersRepo';
import * as categoriesRepo from '../src/repositories/categoriesRepo';

export const setUpItems = (items) =>
  P.mapSeries(items, i => itemsRepo.insert({
    name: i.name, barcode: i.barcode, sp: i.sp, byWeight: i.byWeight, category: i.category}));

export const tearDownItems = () => itemsRepo.deleteAll();

export const setUpUsers = (users) =>
  P.mapSeries(users, u => usersRepo.create({name: u.name, password: u.password, role: u.role}));

export const tearDownUsers = (userIds) =>
  P.mapSeries(userIds, u => usersRepo.remove(u));

export const setUpCategories = (categories) =>
  P.mapSeries(categories, c => categoriesRepo.insert({name: c.name}));

export const tearDownCategories = () => categoriesRepo.deleteAll();
