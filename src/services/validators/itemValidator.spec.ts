import itemValidator from './itemValidator';
import barcodeValidatorMock from './barcodeValidator';
import priceValidatorMock from './priceValidator';

jest.mock('./barcodeValidator');
jest.mock('./priceValidator');

describe('Item Validator', () => {
  const item = {name: 'some', sp: 23, barcode: 'AV'};
  const dummyErr = new Error('dummy');

  beforeEach(() => jest.resetAllMocks())

  it('should validate sp, barcode', async () => {
    priceValidatorMock.mockResolvedValue(true);
    barcodeValidatorMock.mockResolvedValue(true);

    await itemValidator.validate(item);

    expect(priceValidatorMock).toHaveBeenCalledWith(item);
    expect(barcodeValidatorMock).toHaveBeenCalledWith(item);
  })

  it('should reject on price errors', async () => {
    priceValidatorMock.mockRejectedValue(dummyErr);
    barcodeValidatorMock.mockResolvedValue(true);

    const errThr = await itemValidator.validate(item).catch(e => e);

    expect(errThr).toEqual(dummyErr);
    expect(priceValidatorMock).toHaveBeenCalledWith(item);
    expect(barcodeValidatorMock).not.toHaveBeenCalled();
  });

  it('should reject on barcode errors', async () => {
    priceValidatorMock.mockResolvedValue(true);
    barcodeValidatorMock.mockRejectedValue(dummyErr);

    const errThr = await itemValidator.validate(item).catch(e => e);

    expect(errThr).toEqual(dummyErr);
    expect(priceValidatorMock).toHaveBeenCalledWith(item);
    expect(barcodeValidatorMock).toHaveBeenCalledWith(item);
  });
});
