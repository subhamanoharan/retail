import itemsController from './itemsController';
import itemsServiceMock from '../services/itemsService';

jest.mock('../services/itemsService');

describe('ItemsController', () => {
  const item = {name: 'name', barcode: 'ABCD', sp: 5};
  const itemByWeight = {name: 'name', barcode: 'ABCD', sp: 5, byWeight: true, category: 'Rice'};
  const dummyErr = new Error('dummy');

  describe('create', () => {
    it('should create item', async () => {
      const reqMock = {body: item};
      const resMock = {json: jest.fn()};
      const nextMock = jest.fn();

      (itemsServiceMock.create as any).mockResolvedValue(Promise.resolve('newId'));

      await itemsController.create(reqMock, resMock, nextMock);

      expect(itemsServiceMock.create).toHaveBeenCalledWith(item);
      expect(resMock.json).toHaveBeenCalledWith({id: 'newId'});
      expect(nextMock).not.toHaveBeenCalled();
    });

    it('should create item sold by weight', async () => {
      const reqMock = {body: itemByWeight};
      const resMock = {json: jest.fn()};
      const nextMock = jest.fn();

      (itemsServiceMock.create as any).mockResolvedValue(Promise.resolve('newId'));

      await itemsController.create(reqMock, resMock, nextMock);

      expect(itemsServiceMock.create).toHaveBeenCalledWith(itemByWeight);
      expect(resMock.json).toHaveBeenCalledWith({id: 'newId'});
      expect(nextMock).not.toHaveBeenCalled();
    });

    it('should call next with error', async () => {
      const reqMock = {body: item};
      const resMock = jest.fn();
      const nextMock = jest.fn();
      (itemsServiceMock.create as any).mockRejectedValue(dummyErr);

      const errorThrown = await itemsController.create(reqMock, resMock, nextMock).catch(e => e);

      expect(itemsServiceMock.create).toHaveBeenCalledWith(item);
      expect(nextMock).toHaveBeenCalledWith(dummyErr);
      expect(resMock).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    const newItemData = {name: 'newName', barcode: '12', sp: 12};
    const itemId = 12;

    it('should update item', async () => {
      const reqMock = {body: newItemData, params: {itemId}};
      const resMock = {send: jest.fn()};
      const nextMock = jest.fn();

      (itemsServiceMock.update as any).mockResolvedValue(Promise.resolve());

      await itemsController.update(reqMock, resMock, nextMock);

      expect(itemsServiceMock.update).toHaveBeenCalledWith(itemId, newItemData);
      expect(resMock.send).toHaveBeenCalled();
      expect(nextMock).not.toHaveBeenCalled();
    });

    it('should call next with error', async () => {
      const reqMock = {body: newItemData, params: {itemId}};
      const resMock = jest.fn();
      const nextMock = jest.fn();
      (itemsServiceMock.update as any).mockRejectedValue(dummyErr);

      await itemsController.update(reqMock, resMock, nextMock);

      expect(itemsServiceMock.update).toHaveBeenCalledWith(itemId, newItemData);
      expect(nextMock).toHaveBeenCalledWith(dummyErr);
      expect(resMock).not.toHaveBeenCalled();
    });
  });

  describe('list', () => {
    it('should return all items', async () => {
      const reqMock = jest.fn();
      const resMock = {json: jest.fn()};
      const items = ['item1', 'item2'];
      (itemsServiceMock.all as any).mockResolvedValue(Promise.resolve(items));

      await itemsController.all(reqMock, resMock);

      expect(itemsServiceMock.all).toHaveBeenCalled();
      expect(resMock.json).toHaveBeenCalledWith(items);
      expect(reqMock).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove the item', async () => {
      const itemId = 2;
      const reqMock = {params: {itemId}};
      const resMock = {send: jest.fn()};
      (itemsServiceMock.remove as any).mockResolvedValue(Promise.resolve());

      await itemsController.remove(reqMock, resMock);

      expect(itemsServiceMock.remove).toHaveBeenCalledWith(itemId);
      expect(resMock.send).toHaveBeenCalled();
    });
  });
});
