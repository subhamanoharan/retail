import itemValidator from './itemValidator';
import barcodeValidatorMock from './barcodeValidator';
import priceValidatorMock from './priceValidator';
import nameValidatorMock from './nameValidator';

jest.mock('./barcodeValidator');
jest.mock('./priceValidator');
jest.mock('./nameValidator');

describe('Item Validator', () => {
  const item = {name: 'some', sp: 23, barcode: 'AV'};
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
    expect(barcodeValidatorMock).toHaveBeenCalledWith(item, undefined);
  })

  it('should accept itemId optionally', async () => {
    nameValidatorMock.mockResolvedValue(true);
    priceValidatorMock.mockResolvedValue(true);
    barcodeValidatorMock.mockResolvedValue(true);

    await itemValidator.validate(item, itemId);

    expect(nameValidatorMock).toHaveBeenCalledWith(item);
    expect(priceValidatorMock).toHaveBeenCalledWith(item);
    expect(barcodeValidatorMock).toHaveBeenCalledWith(item, itemId);
  })

  it('should reject on name errors', async () => {
    nameValidatorMock.mockRejectedValue(dummyErr);

    const errThr = await itemValidator.validate(item).catch(e => e);

    expect(errThr).toEqual(dummyErr);
    expect(nameValidatorMock).toHaveBeenCalledWith(item);
    expect(priceValidatorMock).not.toHaveBeenCalled();
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
    expect(barcodeValidatorMock).toHaveBeenCalledWith(item, undefined);
  });
});
