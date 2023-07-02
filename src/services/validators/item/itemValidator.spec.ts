import itemValidator from './itemValidator';
import barcodeValidatorMock from './barcodeValidator';
import priceValidatorMock from './priceValidator';
import nameValidatorMock from './nameValidator';
import itemByWeightValidatorMock from './itemByWeightValidator';

jest.mock('./barcodeValidator');
jest.mock('./priceValidator');
jest.mock('./nameValidator');
jest.mock('./itemByWeightValidator');

describe('Item Validator', () => {
  const item = {name: 'some', sp: 23, barcode: 'AV'};
  const itemSoldByWeight = {name: 'some', sp: 23, barcode: 'AV', byWeight: true, category: 'Rice'};
  const itemWithTax = {name: 'some', sp: 23, barcode: 'AV', byWeight: true, category: 'Rice', tax_percent: 5.5};
  const itemId = 12;
  const dummyErr = new Error('dummy');

  beforeEach(() => jest.resetAllMocks())

  it('should validate name, sp, barcode', async () => {
    nameValidatorMock.mockResolvedValue(true);
    priceValidatorMock.mockResolvedValue(true);
    barcodeValidatorMock.mockResolvedValue(true);

    await itemValidator.validate(item);

    expect(nameValidatorMock).toHaveBeenCalledWith(item);
    expect(priceValidatorMock).toHaveBeenCalledWith(item);
    expect(itemByWeightValidatorMock).toHaveBeenCalledWith(item);
    expect(barcodeValidatorMock).toHaveBeenCalledWith(item, undefined);
  })

  it('should validate name, sp, barcode, category for item sold by weight', async () => {
    nameValidatorMock.mockResolvedValue(true);
    priceValidatorMock.mockResolvedValue(true);
    itemByWeightValidatorMock.mockResolvedValue(true);
    barcodeValidatorMock.mockResolvedValue(true);

    await itemValidator.validate(itemSoldByWeight);

    expect(nameValidatorMock).toHaveBeenCalledWith(itemSoldByWeight);
    expect(priceValidatorMock).toHaveBeenCalledWith(itemSoldByWeight);
    expect(itemByWeightValidatorMock).toHaveBeenCalledWith(itemSoldByWeight);
    expect(barcodeValidatorMock).toHaveBeenCalledWith(itemSoldByWeight, undefined);
  })

  it('should validate name, sp, barcode, category for item with tax', async () => {
    nameValidatorMock.mockResolvedValue(true);
    priceValidatorMock.mockResolvedValue(true);
    itemByWeightValidatorMock.mockResolvedValue(true);
    barcodeValidatorMock.mockResolvedValue(true);

    await itemValidator.validate(itemWithTax);

    expect(nameValidatorMock).toHaveBeenCalledWith(itemWithTax);
    expect(priceValidatorMock).toHaveBeenCalledWith(itemWithTax);
    expect(itemByWeightValidatorMock).toHaveBeenCalledWith(itemWithTax);
    expect(barcodeValidatorMock).toHaveBeenCalledWith(itemWithTax, undefined);
  })

  it('should accept itemId optionally', async () => {
    nameValidatorMock.mockResolvedValue(true);
    priceValidatorMock.mockResolvedValue(true);
    barcodeValidatorMock.mockResolvedValue(true);

    await itemValidator.validate(item, itemId);

    expect(nameValidatorMock).toHaveBeenCalledWith(item);
    expect(priceValidatorMock).toHaveBeenCalledWith(item);
    expect(barcodeValidatorMock).toHaveBeenCalledWith(item, itemId);
    expect(itemByWeightValidatorMock).toHaveBeenCalledWith(item);
  })

  it('should reject on name errors', async () => {
    nameValidatorMock.mockRejectedValue(dummyErr);

    const errThr = await itemValidator.validate(item).catch(e => e);

    expect(errThr).toEqual(dummyErr);
    expect(nameValidatorMock).toHaveBeenCalledWith(item);
    expect(priceValidatorMock).not.toHaveBeenCalled();
    expect(itemByWeightValidatorMock).not.toHaveBeenCalled();
    expect(barcodeValidatorMock).not.toHaveBeenCalled();
  });

  it('should reject on price errors', async () => {
    nameValidatorMock.mockResolvedValue(true);
    priceValidatorMock.mockRejectedValue(dummyErr);
    barcodeValidatorMock.mockResolvedValue(true);

    const errThr = await itemValidator.validate(item).catch(e => e);

    expect(errThr).toEqual(dummyErr);
    expect(nameValidatorMock).toHaveBeenCalledWith(item);
    expect(priceValidatorMock).toHaveBeenCalledWith(item);
    expect(itemByWeightValidatorMock).not.toHaveBeenCalled();
    expect(barcodeValidatorMock).not.toHaveBeenCalled();
  });

  it('should reject on item sold by weight errors', async () => {
    nameValidatorMock.mockResolvedValue(true);
    priceValidatorMock.mockResolvedValue(true);
    itemByWeightValidatorMock.mockRejectedValue(dummyErr);
    barcodeValidatorMock.mockResolvedValue(true);

    const errThr = await itemValidator.validate(itemSoldByWeight).catch(e => e);

    expect(errThr).toEqual(dummyErr);
    expect(nameValidatorMock).toHaveBeenCalledWith(itemSoldByWeight);
    expect(priceValidatorMock).toHaveBeenCalledWith(itemSoldByWeight);
    expect(itemByWeightValidatorMock).toHaveBeenCalledWith(itemSoldByWeight);
    expect(barcodeValidatorMock).not.toHaveBeenCalled();
  });

  it('should reject on barcode errors', async () => {
    nameValidatorMock.mockResolvedValue(true);
    priceValidatorMock.mockResolvedValue(true);
    barcodeValidatorMock.mockRejectedValue(dummyErr);

    const errThr = await itemValidator.validate(item).catch(e => e);

    expect(errThr).toEqual(dummyErr);
    expect(nameValidatorMock).toHaveBeenCalledWith(item);
    expect(priceValidatorMock).toHaveBeenCalledWith(item);
    expect(itemByWeightValidatorMock).toHaveBeenCalledWith(item);
    expect(barcodeValidatorMock).toHaveBeenCalledWith(item, undefined);
  });
});
