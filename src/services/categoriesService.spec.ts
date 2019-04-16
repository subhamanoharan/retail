import categoriesService from './categoriesService';
import * as categoriesRepoMock from '../repositories/categoriesRepo';
import InvalidCategoryException from './../exceptions/invalidCategoryException';
import categoryValidatorMock from './validators/category/categoryValidator';

jest.mock('../repositories/categoriesRepo');
jest.mock('./validators/category/categoryValidator');

describe('CategoriesService', () => {
  const category = {name: 'name'};
  const dummyErr = new Error('dummy');

  beforeEach(() => jest.resetAllMocks())

  describe('create', () => {
    it('should insert category', async() => {
      (categoriesRepoMock.insert as any).mockResolvedValue(Promise.resolve('newId'));
      (categoryValidatorMock.validate as any).mockResolvedValue(true);

      const createdId = await categoriesService.create(category);

      expect(createdId).toEqual('newId');
      expect(categoriesRepoMock.insert).toHaveBeenCalledWith({...category});
    });

    it('should reject with category validation error', async () => {
      (categoryValidatorMock.validate as any).mockRejectedValue(dummyErr);

      const errorThrown = await categoriesService.create(category).catch(e => e);

      expect(errorThrown).toEqual(dummyErr);
      expect(categoryValidatorMock.validate).toHaveBeenCalledWith(category);
      expect(categoriesRepoMock.insert).not.toHaveBeenCalled();
    });

    it('should reject with InvalidCategoryException on error', async () => {
      (categoriesRepoMock.insert as any).mockRejectedValue(dummyErr);
      (categoryValidatorMock.validate as any).mockResolvedValue(true);

      const errorThrown = await categoriesService.create(category).catch(e => e);

      expect(errorThrown).toBeInstanceOf(InvalidCategoryException);
      expect(errorThrown.message).toEqual(dummyErr.message);
      expect(categoriesRepoMock.insert).toHaveBeenCalledWith({...category});
    });
  });

  describe('update', () => {
    const categoryId = 123;

    it('should update category', async() => {
      const categoryToUpdate = {name: 'differentCases'};
      (categoriesRepoMock.update as any).mockResolvedValue();
      (categoryValidatorMock.validate as any).mockResolvedValue(true);

      await categoriesService.update(categoryId, categoryToUpdate);

      expect(categoryValidatorMock.validate).toHaveBeenCalledWith(categoryToUpdate);
      expect(categoriesRepoMock.update).toHaveBeenCalledWith(categoryId, categoryToUpdate);
    });

    it('should reject with item validation error', async () => {
      (categoryValidatorMock.validate as any).mockRejectedValue(dummyErr);

      const errorThrown = await categoriesService.update(categoryId, category).catch(e => e);

      expect(errorThrown).toEqual(dummyErr);
      expect(categoryValidatorMock.validate).toHaveBeenCalledWith(category);
      expect(categoriesRepoMock.update).not.toHaveBeenCalled();
    });

    it('should reject with InvalidCategoryException on error', async () => {
      (categoriesRepoMock.update as any).mockRejectedValue(dummyErr);
      (categoryValidatorMock.validate as any).mockResolvedValue(true);

      const errorThrown = await categoriesService.update(categoryId, category).catch(e => e);

      expect(errorThrown).toBeInstanceOf(InvalidCategoryException);
      expect(errorThrown.message).toEqual(dummyErr.message);
      expect(categoryValidatorMock.validate).toHaveBeenCalledWith(category);
      expect(categoriesRepoMock.update).toHaveBeenCalledWith(categoryId, category);
    });
  });

  describe('list', () => {
    it('should get all categories', async() => {
      const cat1 = {id:1, name: 'name1'};
      const cat2 = {id:2, name: 'name2'};
      (categoriesRepoMock.all as any).mockResolvedValue(Promise.resolve([cat1, cat2]));

      const categoriesFound = await categoriesService.all();

      expect(categoriesFound).toEqual([cat1, cat2]);
      expect(categoriesRepoMock.all).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    const categoryId = 123;
    it('should remove item', async () => {
      (categoriesRepoMock.remove as any).mockResolvedValue(true);

      await categoriesService.remove(categoryId);

      expect(categoriesRepoMock.remove).toHaveBeenCalledWith(categoryId);
    });
  });
});
