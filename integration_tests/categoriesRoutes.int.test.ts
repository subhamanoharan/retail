import * as request from 'supertest';

import app from '../src/app';
import * as categoriesRepo from '../src/repositories/categoriesRepo';
import * as itemsRepo from '../src/repositories/itemsRepo';
import constants from '../src/constants';
import {setUpUsers, tearDownUsers, setUpItems, tearDownItems,
  setUpCategories, tearDownCategories} from './dataHelper';

const {CATEGORY_ROUTE_ERRORS: ERRORS, ROLES, USER_ROUTE_ERRORS: {FORBIDDEN}} = constants;

describe('Categories routes', () => {
  const adminAgent = request.agent(app);
  const userAgent = request.agent(app);

  const category = {name: 'rice'};

  const admin = {name: 'adminCat1', password: 'adminCat1pwd', role: ROLES.ADMIN};
  const user = {name: 'userCat1', password: 'userCat1pwd', role: ROLES.USER};
  let userIds;
  const LOGIN_ROUTE = '/api/users/authenticate';

  beforeAll(async () => {
    userIds = await setUpUsers([admin, user]);
  });

  beforeEach(async () => {
    await adminAgent.post(LOGIN_ROUTE).auth(admin.name, admin.password).expect(200)
    await userAgent.post(LOGIN_ROUTE).auth(user.name, user.password).expect(200)
  });

  afterAll(async () => {
    await tearDownUsers(userIds);
    await tearDownCategories();
    await tearDownItems();
  });

  describe('Create', () => {
    it('should add a category', async () => {
      const createdCategoryId = await adminAgent
        .post('/api/categories')
        .send(category)
        .expect(200)
        .then(r => r.body.id);
      const createdCategory = await categoriesRepo.findById(createdCategoryId);
      expect(createdCategory).toEqual({id: createdCategoryId, ...category});
    });

    it('should return 400 on duplicate name', () => {
      return adminAgent
        .post('/api/categories')
        .send(category)
        .expect(400)
        .then(r => expect(r.body).toEqual({errors: [ERRORS.CATEGORY_EXISTS(category)]}));
    });

    it('should return 200 on duplicate name with different case', () => {
      return adminAgent
        .post('/api/categories')
        .send({...category, name: category.name.toUpperCase()})
        .expect(200);
    });

    it('should return 400 on duplicate name of different types', async () => {
      await adminAgent
        .post('/api/categories')
        .send({name: 12})
        .expect(200);
      return adminAgent
        .post('/api/categories')
        .send({name: '12'})
        .expect(400)
        .then(r => expect(r.body).toEqual({errors: [ERRORS.CATEGORY_EXISTS({name: 12})]}));
    });

    it('should return 403 Forbidden for other users', () => {
      return userAgent
        .post('/api/categories')
        .expect(403)
        .then(r => expect(r.body).toEqual({errors: [FORBIDDEN]}));
    });
  });

  describe('Update', () => {
    afterEach(() => tearDownCategories());

    it('should update existing category', async () => {
      const catToUpdate = {name: 'catToUpdate'};
      const newCategoryData = {name: 'catToUpdateNew'};
      const [categoryId] = await setUpCategories([catToUpdate]);
      await adminAgent
        .put(`/api/categories/${categoryId}`)
        .send(newCategoryData)
        .expect(200);
      const updatedCategory = await categoriesRepo.findById(categoryId);
      expect(updatedCategory).toEqual({id: categoryId, ...newCategoryData});
    });

    it('should return 400 on already existing name with same case', async () => {
      const category1 = {name: 'category1'};
      const category2 = {name: 'existingCategory'};
      const [categoryId1, categoryId2] = await setUpCategories([category1, category2]);
      return adminAgent
        .put(`/api/categories/${categoryId1}`)
        .send(category2)
        .expect(400)
        .then(r => expect(r.body).toEqual({errors: [ERRORS.CATEGORY_EXISTS(category2)]}));
    });

    it('should return 403 Forbidden for other users', () => {
      return userAgent
        .put(`/api/categories/0`)
        .expect(403)
        .then(r => expect(r.body).toEqual({errors: [FORBIDDEN]}));
    });
  });

  describe('list', () => {

    beforeEach(() => tearDownCategories());

    afterEach(() => tearDownCategories());

    it('should list all categories', async () => {
      const category1 = {name: 'category1'};
      const category2 = {name: 'category2'};
      const [id1, id2] = await setUpCategories([category1, category2]);

      await userAgent
        .get('/api/categories')
        .expect(200)
        .then(r => expect(r.body).toEqual([{id: id1, ...category1}, {id: id2, ...category2}]));
    });
  });

  describe('delete', () => {
    it('should delete category when it exists', async () => {
      const categoryToDelete = {name: 'categoryToDel'};
      const [categoryToDeleteId] = await setUpCategories([categoryToDelete]);
      const [itemId] = await setUpItems([{name: 'some item', barcode: 'barcode', sp: 123, byWeight: true, category: categoryToDelete.name}])

      await adminAgent.delete(`/api/categories/${categoryToDeleteId}`).expect(200);

      const categoryFound = await categoriesRepo.findById(categoryToDeleteId);
      expect(categoryFound).not.toBeDefined();
      const itemFound = await itemsRepo.findById(itemId);
      expect(itemFound).not.toBeDefined();
    });

    it('should ignore when category does not exist', async () => {
      await adminAgent.delete('/api/categories/0').expect(200);
    });

    it('should return 403 Forbidden for other users', () => {
      return userAgent
        .delete('/api/categories/0')
        .expect(403)
        .then(r => expect(r.body).toEqual({errors: [FORBIDDEN]}));
    });
  });
});
