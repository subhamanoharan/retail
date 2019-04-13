import itemsService from './itemsService';
import * as itemsRepoMock from '../repositories/itemsRepo';
import itemValidatorMock from './validators/item/itemValidator';
import InvalidItemException from './../exceptions/invalidItemException';
import constants from '../constants';

jest.mock('../repositories/itemsRepo');
jest.mock('./validators/item/itemValidator');

const {ERRORS} = constants;

describe('ItemsService', () => {
  const item = {name: 'name', barcode: 'ABCD', sp: 5};
  const dummyErr = new Error('dummy');

  beforeEach(() => jest.resetAllMocks())

  describe('create', () => {
    it('should insert item', async() => {
      (itemsRepoMock.insert as any).mockResolvedValue(Promise.resolve('newId'));
      (itemValidatorMock.validate as any).mockResolvedValue(true);

      const createdId = await itemsService.create(item);

      expect(createdId).toEqual('newId');
      expect(itemsRepoMock.insert).toHaveBeenCalledWith({...item, barcode: 'abcd'});
    });

    it('should reject with item validation error', async () => {
      (itemValidatorMock.validate as any).mockRejectedValue(dummyErr);

      const errorThrown = await itemsService.create(item).catch(e => e);

      expect(errorThrown).toEqual(dummyErr);
      expect(itemValidatorMock.validate).toHaveBeenCalledWith({...item, barcode: 'abcd'});
      expect(itemsRepoMock.insert).not.toHaveBeenCalled();
    });

    it('should reject with InvalidItemException on error', async () => {
      (itemsRepoMock.insert as any).mockRejectedValue(dummyErr);
      (itemValidatorMock.validate as any).mockResolvedValue(true);

      const errorThrown = await itemsService.create(item).catch(e => e);

      expect(errorThrown).toBeInstanceOf(InvalidItemException);
      expect(errorThrown.message).toEqual(dummyErr.message);
      expect(itemsRepoMock.insert).toHaveBeenCalledWith({...item, barcode: 'abcd'});
    });
  });
  describe('update', () => {
    const itemId = 123;
    it('should update item', async() => {
      (itemsRepoMock.update as any).mockResolvedValue();
      (itemValidatorMock.validate as any).mockResolvedValue(true);

      await itemsService.update(itemId, item);

      expect(itemValidatorMock.validate).toHaveBeenCalledWith({...item, barcode: 'abcd'}, itemId);
      expect(itemsRepoMock.update).toHaveBeenCalledWith(itemId, {...item, barcode: 'abcd'});
    });

    it('should reject with item validation error', async () => {
      (itemValidatorMock.validate as any).mockRejectedValue(dummyErr);

      const errorThrown = await itemsService.update(itemId, item).catch(e => e);

      expect(errorThrown).toEqual(dummyErr);
      expect(itemValidatorMock.validate).toHaveBeenCalledWith({...item, barcode: 'abcd'}, itemId);
      expect(itemsRepoMock.update).not.toHaveBeenCalled();
    });

    it('should reject with InvalidItemException on error', async () => {
      (itemsRepoMock.update as any).mockRejectedValue(dummyErr);
      (itemValidatorMock.validate as any).mockResolvedValue(true);

      const errorThrown = await itemsService.update(itemId, item).catch(e => e);

      expect(errorThrown).toBeInstanceOf(InvalidItemException);
      expect(errorThrown.message).toEqual(dummyErr.message);
      expect(itemValidatorMock.validate).toHaveBeenCalledWith({...item, barcode: 'abcd'}, itemId);
      expect(itemsRepoMock.update).toHaveBeenCalledWith(itemId, {...item, barcode: 'abcd'});
    });
  });

  describe('list', () => {
    it('should get all items', async() => {
      const item1 = {id:1, name: 'name1', barcode: 'ABCD1', sp: 5};
      const item2 = {id:2, name: 'name2', barcode: 'ABCD2', sp: 5};
      (itemsRepoMock.all as any).mockResolvedValue(Promise.resolve([item1, item2]));

      const itemsFound = await itemsService.all();

      expect(itemsFound).toEqual([item1, item2]);
      expect(itemsRepoMock.all).toHaveBeenCalled();
    });
  });


  describe('remove', () => {
    const itemId = 123;
    it('should remove item', async () => {
      (itemsRepoMock.remove as any).mockResolvedValue(true);

      await itemsService.remove(itemId);

      expect(itemsRepoMock.remove).toHaveBeenCalledWith(itemId);
    });
  });
});
