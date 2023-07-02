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
  const itemSoldByWt = {name: 'name', barcode: 'ABCD', sp: 5, byWeight: true, category: 'Rice'};
  const itemWithTax = {name: 'name', barcode: 'ABCD', sp: 5, byWeight: true, category: 'Rice', tax_percent: 10};
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

    it('should insert item sold by weight', async() => {
      (itemsRepoMock.insert as any).mockResolvedValue(Promise.resolve('newId'));
      (itemValidatorMock.validate as any).mockResolvedValue(true);

      const createdId = await itemsService.create(itemSoldByWt);

      expect(createdId).toEqual('newId');
      expect(itemsRepoMock.insert).toHaveBeenCalledWith({...itemSoldByWt, barcode: 'abcd'});
    });

    it('should insert item with tax_percent', async() => {
      (itemsRepoMock.insert as any).mockResolvedValue(Promise.resolve('newId'));
      (itemValidatorMock.validate as any).mockResolvedValue(true);

      const createdId = await itemsService.create(itemWithTax);

      expect(createdId).toEqual('newId');
      expect(itemsRepoMock.insert).toHaveBeenCalledWith({...itemWithTax, barcode: 'abcd'});
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

    it('should update item sold by weight', async() => {
      (itemsRepoMock.update as any).mockResolvedValue();
      (itemValidatorMock.validate as any).mockResolvedValue(true);

      await itemsService.update(itemId, itemSoldByWt);

      expect(itemValidatorMock.validate).toHaveBeenCalledWith({...itemSoldByWt, barcode: 'abcd'}, itemId);
      expect(itemsRepoMock.update).toHaveBeenCalledWith(itemId, {...itemSoldByWt, barcode: 'abcd'});
    });

    it('should update item with tax', async() => {
      (itemsRepoMock.update as any).mockResolvedValue();
      (itemValidatorMock.validate as any).mockResolvedValue(true);

      await itemsService.update(itemId, itemWithTax);

      expect(itemValidatorMock.validate).toHaveBeenCalledWith({...itemWithTax, barcode: 'abcd'}, itemId);
      expect(itemsRepoMock.update).toHaveBeenCalledWith(itemId, {...itemWithTax, barcode: 'abcd'});
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
      const item1 = {id:1, name: 'name1', barcode: 'ABCD1', sp: 5, by_weight: null, category: null};
      const item2 = {id:2, name: 'name2', barcode: 'ABCD2', sp: 5, by_weight: null, category: null};
      const item3 = {id:2, name: 'name2', barcode: 'ABCD3', sp: 5, by_weight: true, category: 'Rice'};
      const item4 = {id:4, name: 'name4', barcode: 'ABCD4', sp: 5, by_weight: true, category: 'Rice', tax_percent: 5.4};
      (itemsRepoMock.all as any).mockResolvedValue(Promise.resolve([item1, item2, item3, item4]));

      const itemsFound = await itemsService.all();

      const expectedItem1 = {id:1, name: 'name1', barcode: 'ABCD1', sp: 5};
      const expectedItem2 = {id:2, name: 'name2', barcode: 'ABCD2', sp: 5};
      const expectedItem3 = {id:2, name: 'name2', barcode: 'ABCD3', sp: 5, byWeight: true, category: 'Rice'};
      const expectedItem4 = {id:4, name: 'name4', barcode: 'ABCD4', sp: 5, byWeight: true, category: 'Rice', tax_percent: 5.4};
      expect(itemsFound).toEqual([expectedItem1, expectedItem2, expectedItem3, expectedItem4]);
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
