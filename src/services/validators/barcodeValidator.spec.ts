import barcodeValidator from './barcodeValidator';
import constants from '../../constants';
import InvalidItemException from './../../exceptions/invalidItemException';

import * as itemsRepoMock from '../../repositories/itemsRepo';

jest.mock('../../repositories/itemsRepo');

const {ERRORS} = constants;

describe('Barcode validator', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should resolve if barcode is valid', async () => {
    const item = {barcode: 'ABCD'};
    const result = await barcodeValidator(item);

    expect(result).toBe(true);
    expect(itemsRepoMock.doesBarcodeExist).toHaveBeenCalledWith(item);
  });

  it('should reject if barcode is invalid', async () => {
    const item = {barcode: 123};
    const errorThrown = await barcodeValidator(item).catch(e => e);

    expect(errorThrown).toBeInstanceOf(InvalidItemException);
    expect(errorThrown.message).toEqual(ERRORS.INVALID_BARCODE);
    expect(itemsRepoMock.doesBarcodeExist).not.toHaveBeenCalled();
  });

  it('should reject if barcode exists', async () => {
    const item = {barcode: 'ABCD'};
    (itemsRepoMock.doesBarcodeExist as any).mockResolvedValue(true);

    const errorThrown = await barcodeValidator(item).catch(e => e);

    expect(errorThrown).toBeInstanceOf(InvalidItemException);
    expect(errorThrown.message).toEqual(ERRORS.BARCODE_EXISTS(item));
    expect(itemsRepoMock.doesBarcodeExist).toHaveBeenCalledWith(item);
  });
});
