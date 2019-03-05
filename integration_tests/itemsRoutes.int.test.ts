import * as request from 'supertest';

import app from '../src/app';
import * as itemsRepo from '../src/repositories/itemsRepo';
import {tearDownItems} from './dataHelper';

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
});
