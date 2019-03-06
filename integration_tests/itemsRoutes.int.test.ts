import * as request from 'supertest';

import app from '../src/app';
import * as itemsRepo from '../src/repositories/itemsRepo';
import constants from '../src/constants';
import {tearDownItems, setUpItems} from './dataHelper';

const {ERRORS} = constants;

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
        .then(r => expect(r.body).toEqual({errors: [ERRORS.BARCODE_EXISTS(item)]}));
    });

    it('should return 400 on invalid price', () => {
      return agent
        .post('/items')
        .send({...item, barcode: 'barcode_invalid_price', sp: 'invalid'})
        .expect(400)
        .then(r => expect(r.body).toEqual({errors: [ERRORS.INVALID_PRICE]}));
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

  describe('delete', () => {
    it('should delete item when it exists', async () => {
      const [itemToDeleteId] = await setUpItems([{name: 'itemToDel', sp: 12, barcode: 'ITEM_TO_DEL'}])
      await agent.delete(`/items/${itemToDeleteId}`).expect(200);
      const itemFound = await itemsRepo.findById(itemToDeleteId);
      expect(itemFound).not.toBeDefined();
    });
    it('should ignore when item does not exist', async () => {
      await agent.delete('/items/0').expect(200);
    });
  });
});
