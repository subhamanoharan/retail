import * as request from 'supertest';

import app from '../src/app';
import * as itemsRepo from '../src/repositories/itemsRepo';
import constants from '../src/constants';
import {tearDownItems, setUpItems,
  setUpCategories, tearDownCategories,
  setUpUsers, tearDownUsers} from './dataHelper';

const {ERRORS, ROLES, USER_ROUTE_ERRORS: {FORBIDDEN}} = constants;

describe('Items routes', () => {
  const agent = request.agent(app);
  const userAgent = request.agent(app);
  const item = {name: 'some item', barcode: 'barcode', sp: 123};
  const admin = {name: 'adminItems1', password: 'adminItems1pwd', role: ROLES.ADMIN};
  const user = {name: 'userItems1', password: 'userItems1pwd', role: ROLES.USER};
  const category = {name: 'catUpdateItemByWeight'};

  let userIds;
  let categoryId;
  const LOGIN_ROUTE = '/api/users/authenticate';

  beforeAll(async () => {
    userIds = await setUpUsers([admin, user]);
    [categoryId] = await setUpCategories([category]);
  });

  beforeEach(async () => {
    await agent.post(LOGIN_ROUTE).auth(admin.name, admin.password).expect(200)
    await userAgent.post(LOGIN_ROUTE).auth(user.name, user.password).expect(200)
  });

  afterAll(async () => {
    await tearDownUsers(userIds);
    await tearDownCategories();
    await tearDownItems();
  });

  describe('Create', () => {
    it('should add a item', async () => {
      const createdItemId = await agent
        .post('/api/items')
        .send(item)
        .expect(200)
        .then(r => r.body.id);
      const createdItem = await itemsRepo.findById(createdItemId);
      expect(createdItem).toEqual({id: createdItemId, ...item, by_weight: null, category_id: null, tax_percent: null});
    });

    it('should return 400 on duplicate barcode', () => {
      return agent
        .post('/api/items')
        .send(item)
        .expect(400)
        .then(r => expect(r.body).toEqual({errors: [ERRORS.BARCODE_EXISTS(item)]}));
    });

    it('should return 400 on duplicate barcode with different case', () => {
      return agent
        .post('/api/items')
        .send({...item, barcode: 'BarCode'})
        .expect(400)
        .then(r => expect(r.body).toEqual({errors: [ERRORS.BARCODE_EXISTS(item)]}));
    });

    it('should return 400 on invalid price', () => {
      return agent
        .post('/api/items')
        .send({...item, barcode: 'barcode_invalid_price', sp: 'invalid'})
        .expect(400)
        .then(r => expect(r.body).toEqual({errors: [ERRORS.INVALID_PRICE]}));
    });

    describe('item sold by weight', () => {
      const category = {name: 'Rice'};
      const itemSoldByWeight = {name: 'some item', barcode: 'barcode-by-weight',
        sp: 123, byWeight: true, category: category.name};
      let categoryId;

      beforeAll(async() => {
        [categoryId] = await setUpCategories([category]);
      });

      it('should add item', async () => {
        const createdItemId = await agent
          .post('/api/items')
          .send(itemSoldByWeight)
          .expect(200)
          .then(r => r.body.id);
        const createdItem = await itemsRepo.findById(createdItemId);
        expect(createdItem).toEqual({id: createdItemId,
          name: 'some item', barcode: 'barcode-by-weight', sp: 123,
          by_weight: true, category_id: categoryId, tax_percent: null});
      });

      it('should return 400 on invalid category', () => {
        return agent
          .post('/api/items')
          .send({...itemSoldByWeight, barcode: 'barcode-by-wt-invalid-category', category: null})
          .expect(400)
          .then(r => expect(r.body).toEqual({errors: [ERRORS.INVALID_CATEGORY]}));
      });

      it('should return 400 when category is passed but item is not sold by weight', () => {
        return agent
          .post('/api/items')
          .send({...itemSoldByWeight, barcode: 'barcode-by-wt-no-category', byWeight: false})
          .expect(400)
          .then(r => expect(r.body).toEqual({errors: [ERRORS.CATEGORY_NOT_ALLOWED]}));
      });
    });

    it('should return 403 Forbidden for other users', () => {
      return userAgent
        .post('/api/items')
        .expect(403)
        .then(r => expect(r.body).toEqual({errors: [FORBIDDEN]}));
    });
  });

  describe('Update', () => {

    afterEach(() => tearDownItems());

    it('should update existing item', async () => {
      const itemToUpdate = {name: 'itemToUpdate', barcode: 'itemToUpdate', sp: 12};
      const newItemData = {name: 'itemToUpdate', barcode: 'itemToUpdate', sp: 15};
      const [itemId] = await setUpItems([itemToUpdate]);
      await agent
        .put(`/api/items/${itemId}`)
        .send(newItemData)
        .expect(200);
      const updatedItem = await itemsRepo.findById(itemId);
      expect(updatedItem).toEqual({id: itemId, ...newItemData,
        barcode: newItemData.barcode.toLowerCase(), by_weight: null, category_id: null, tax_percent: null});
    });

    it('should update existing item to item by weight', async () => {
      const itemToUpdate = {name: 'itemToUpdate', barcode: 'itemToUpdateToWt', sp: 12};
      const [itemId] = await setUpItems([itemToUpdate]);
      await agent
        .put(`/api/items/${itemId}`)
        .send({...itemToUpdate, byWeight: true, category: category.name, sp: 23.5})
        .expect(200);
      const updatedItem = await itemsRepo.findById(itemId);
      expect(updatedItem).toEqual({id: itemId,name: itemToUpdate.name, sp: 23.5,
        barcode: itemToUpdate.barcode.toLowerCase(), by_weight: true, category_id: categoryId, tax_percent: null});
    });

    it('should return 400 on invalid name', async () => {
      const itemToUpdate = {name: 'itemToUpdateWithInvalid', barcode: 'itemToUpdateWithInvalid', sp: 12};
      const newItemData = {name: 12, barcode: 'itemToUpdateWithInvalid', sp: 15};
      const [itemId] = await setUpItems([itemToUpdate]);
      return agent
        .put(`/api/items/${itemId}`)
        .send(newItemData)
        .expect(400)
        .then(r => expect(r.body).toEqual({errors: [ERRORS.INVALID_NAME]}));
    });

    it('should return 403 Forbidden for other users', () => {
      return userAgent
        .put(`/api/items/1`)
        .expect(403)
        .then(r => expect(r.body).toEqual({errors: [FORBIDDEN]}));
    });

    describe('item sold by weight', () => {
      it('should update item sold by weight', async () => {
        const itemToUpdate = {name: 'itemToUpdate', barcode: 'itemToUpdate1', sp: 12,
          byWeight: true, category: category.name};
        const [itemId] = await setUpItems([itemToUpdate]);
        await agent
          .put(`/api/items/${itemId}`)
          .send({...itemToUpdate, sp: 15})
          .expect(200);
        const updatedItem = await itemsRepo.findById(itemId);
        expect(updatedItem).toEqual({
          id: itemId, name: itemToUpdate.name, sp: 15,
          barcode: itemToUpdate.barcode.toLowerCase(), by_weight: true, category_id: categoryId, tax_percent: null});
      })

      it('should update item to not sold by weight', async () => {
        const itemToUpdate = {name: 'itemToUpdate', barcode: 'itemToUpdate2', sp: 12,
          byWeight: true, category: category.name};
        const [itemId] = await setUpItems([itemToUpdate]);
        await agent
          .put(`/api/items/${itemId}`)
          .send({name: 'itemToUpdate', barcode: 'itemToUpdate2', sp: 12, byWeight: false})
          .expect(200);

        const updatedItem = await itemsRepo.findById(itemId);
        expect(updatedItem).toEqual({
          id: itemId, name: itemToUpdate.name, sp: itemToUpdate.sp,
          barcode: itemToUpdate.barcode.toLowerCase(), by_weight: false, category_id: null, tax_percent: null});
      })
    });
  });

  describe('list', () => {

    beforeEach(() => tearDownItems());

    it('should list all items', async () => {
      const item1 = {name: 'item1', barcode: 'AB', sp: 125, tax_percent: null};
      const item2 = {name: 'item2', barcode: 'AC', sp: 123, tax_percent: null};
      const item3 = {name: 'item3', barcode: 'AD', sp: 124, byWeight: true, category: category.name, tax_percent: null};
      const [id1, id2, id3] = await setUpItems([item1, item2, item3]);

      await userAgent
        .get('/api/items')
        .expect(200)
        .then(r => expect(r.body).toEqual([
          {id: id1, ...item1},
          {id: id2, ...item2},
          {id: id3, ...item3}]));
    });
  });

  describe('delete', () => {
    it('should delete item when it exists', async () => {
      const [itemToDeleteId] = await setUpItems([{name: 'itemToDel', sp: 12, barcode: 'ITEM_TO_DEL'}])
      await agent.delete(`/api/items/${itemToDeleteId}`).expect(200);
      const itemFound = await itemsRepo.findById(itemToDeleteId);
      expect(itemFound).not.toBeDefined();
    });

    it('should delete item sold by weight when it exists', async () => {
      const [itemToDeleteId] = await setUpItems([
        {name: 'itemToDel', sp: 12, barcode: 'ITEM_TO_DEL_BY_WT', byWeight: true, category: category.name}])
      await agent.delete(`/api/items/${itemToDeleteId}`).expect(200);
      const itemFound = await itemsRepo.findById(itemToDeleteId);
      expect(itemFound).not.toBeDefined();
    });

    it('should ignore when item does not exist', async () => {
      await agent.delete('/api/items/0').expect(200);
    });

    it('should return 403 Forbidden for other users', () => {
      return userAgent
        .delete('/api/items/0')
        .expect(403)
        .then(r => expect(r.body).toEqual({errors: [FORBIDDEN]}));
    });
  });
});
