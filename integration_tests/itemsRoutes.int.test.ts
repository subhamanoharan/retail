import * as request from 'supertest';

import app from '../src/app';
import * as itemsRepo from '../src/repositories/itemsRepo';
import {tearDownItems, setUpItems} from './dataHelper';

describe('Items routes', () => {
  const agent = request(app);
  const item = {name: 'some item', barcode: 'barcode', sp: 123};

  afterAll(() => tearDownItems());

  describe('Create', () => {
    it('should add a item', async () => {
      const createdItemId = await agent
        .post('/items')
        .send(item)
        .expect(200)
        .then(r => r.body.id);
      const createdItem = await itemsRepo.findById(createdItemId);
      expect(createdItem).toEqual({id: createdItemId, ...item});
    });

    it('should return 400 on duplicate barcode', () => {
      return agent
        .post('/items')
        .send(item)
        .expect(400)
        .then(r => expect(r.body).toEqual({errors:
          ['duplicate key value violates unique constraint \"items_barcode_key\"']}));
    });
  });

  describe('list', () => {

    beforeEach(() => tearDownItems());

    afterEach(() => tearDownItems());

    it('should list all items', async () => {
      const item1 = {name: 'item1', barcode: 'AB', sp: 125};
      const item2 = {name: 'item2', barcode: 'AC', sp: 123};
      const [id1, id2] = await setUpItems([item1, item2]);
      
      await agent
        .get('/items')
        .expect(200)
        .then(r => expect(r.body).toEqual([{id: id1, ...item1}, {id: id2, ...item2}]));
    });
  });
});
