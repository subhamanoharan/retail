import categoriesController from './categoriesController';
import categoriesServiceMock from '../services/categoriesService';

jest.mock('../services/categoriesService');

describe('CategoriesController', () => {
  const category = {name: 'name'};
  const dummyErr = new Error('dummy');

  describe('create', () => {
    it('should create category', async () => {
      const reqMock = {body: category};
      const resMock = {json: jest.fn()};
      const nextMock = jest.fn();

      (categoriesServiceMock.create as any).mockResolvedValue(Promise.resolve('newId'));

      await categoriesController.create(reqMock, resMock, nextMock);

      expect(categoriesServiceMock.create).toHaveBeenCalledWith(category);
      expect(resMock.json).toHaveBeenCalledWith({id: 'newId'});
      expect(nextMock).not.toHaveBeenCalled();
    });

    it('should call next with error', async () => {
      const reqMock = {body: category};
      const resMock = jest.fn();
      const nextMock = jest.fn();
      (categoriesServiceMock.create as any).mockRejectedValue(dummyErr);

      const errorThrown = await categoriesController.create(reqMock, resMock, nextMock).catch(e => e);

      expect(categoriesServiceMock.create).toHaveBeenCalledWith(category);
      expect(nextMock).toHaveBeenCalledWith(dummyErr);
      expect(resMock).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    const newCategoryData = {name: 'newName'};
    const categoryId = 12;

    it('should update category', async () => {
      const reqMock = {body: newCategoryData, params: {categoryId}};
      const resMock = {send: jest.fn()};
      const nextMock = jest.fn();

      (categoriesServiceMock.update as any).mockResolvedValue(Promise.resolve());

      await categoriesController.update(reqMock, resMock, nextMock);

      expect(categoriesServiceMock.update).toHaveBeenCalledWith(categoryId, newCategoryData);
      expect(resMock.send).toHaveBeenCalled();
      expect(nextMock).not.toHaveBeenCalled();
    });

    it('should call next with error', async () => {
      const reqMock = {body: newCategoryData, params: {categoryId}};
      const resMock = jest.fn();
      const nextMock = jest.fn();
      (categoriesServiceMock.update as any).mockRejectedValue(dummyErr);

      await categoriesController.update(reqMock, resMock, nextMock);

      expect(categoriesServiceMock.update).toHaveBeenCalledWith(categoryId, newCategoryData);
      expect(nextMock).toHaveBeenCalledWith(dummyErr);
      expect(resMock).not.toHaveBeenCalled();
    });
  });

  describe('list', () => {
    it('should return all categories', async () => {
      const reqMock = jest.fn();
      const resMock = {json: jest.fn()};
      const categories = ['category1', 'category2'];
      (categoriesServiceMock.all as any).mockResolvedValue(Promise.resolve(categories));

      await categoriesController.all(reqMock, resMock);

      expect(categoriesServiceMock.all).toHaveBeenCalled();
      expect(resMock.json).toHaveBeenCalledWith(categories);
      expect(reqMock).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove the category', async () => {
      const categoryId = 2;
      const reqMock = {params: {categoryId}};
      const resMock = {send: jest.fn()};
      (categoriesServiceMock.remove as any).mockResolvedValue(Promise.resolve());

      await categoriesController.remove(reqMock, resMock);

      expect(categoriesServiceMock.remove).toHaveBeenCalledWith(categoryId);
      expect(resMock.send).toHaveBeenCalled();
    });
  });
});
