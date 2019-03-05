import * as P from 'bluebird';
import * as itemsRepo from '../src/repositories/itemsRepo';

export const tearDownItems = () => itemsRepo.deleteAll();
