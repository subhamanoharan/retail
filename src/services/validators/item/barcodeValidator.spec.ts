import barcodeValidator from './barcodeValidator';
import constants from '../../../constants';
import InvalidItemException from './../../../exceptions/invalidItemException';

import * as itemsRepoMock from '../../../repositories/itemsRepo';

jest.mock('../../../repositories/itemsRepo');

const {ERRORS} = constants;

describe('Barcode validator', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should resolve if barcode is valid', async () => {
    const item = {barcode: 'ABCD'};
    const result = await barcodeValidator(item);

    expect(result).toBe(true);
    expect(itemsRepoMock.getItemIdForBarcode).toHaveBeenCalledWith(item.barcode);
  });

  it('should reject if barcode is invalid', async () => {
    const item = {barcode: 123};
    const errorThrown = await barcodeValidator(item).catch(e => e);

    expect(errorThrown).toBeInstanceOf(InvalidItemException);
    expect(errorThrown.message).toEqual(ERRORS.INVALID_BARCODE);
    expect(itemsRepoMock.doesBarcodeExist).not.toHaveBeenCalled();
  });

  it('should resolve if barcode exists and is its own', async () => {
    const item = {barcode: 'ABCD'};
    const itemId = 12;
    (itemsRepoMock.getItemIdForBarcode as any).mockResolvedValue(itemId);

    const result = await barcodeValidator(item, itemId);

    expect(result).toBe(true);
    expect(itemsRepoMock.getItemIdForBarcode).toHaveBeenCalledWith(item.barcode);
  });

  it('should reject if barcode exists for another item', async () => {
    const item = {barcode: 'ABCD'};
    const itemId = 12;

    (itemsRepoMock.getItemIdForBarcode as any).mockResolvedValue(13);

    const errorThrown = await barcodeValidator(item, itemId).catch(e => e);

    expect(errorThrown).toBeInstanceOf(InvalidItemException);
    expect(errorThrown.message).toEqual(ERRORS.BARCODE_EXISTS(item));
    expect(itemsRepoMock.getItemIdForBarcode).toHaveBeenCalledWith(item.barcode);
  });

  it('should reject if barcode exists and current item does not exist yet', async () => {
    const item = {barcode: 'ABCD'};
    (itemsRepoMock.getItemIdForBarcode as any).mockResolvedValue(13);

    const errorThrown = await barcodeValidator(item).catch(e => e);

    expect(errorThrown).toBeInstanceOf(InvalidItemException);
    expect(errorThrown.message).toEqual(ERRORS.BARCODE_EXISTS(item));
    expect(itemsRepoMock.getItemIdForBarcode).toHaveBeenCalledWith(item.barcode);
  });
});
