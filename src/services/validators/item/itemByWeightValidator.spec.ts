import categoryValidatorMock from './categoryValidator';
import itemByWeightValidatorMock from './itemByWeightValidator';
import constants from '../../../constants';
import InvalidItemException from './../../../exceptions/invalidItemException';

jest.mock('./categoryValidator');

const {ERRORS} = constants;

describe('Item by weight Validator', () => {
  const item = {name: 'some', sp: 23, barcode: 'AV'};
  const itemSoldByWeight = {name: 'some', sp: 23, barcode: 'AV', byWeight: true, category: 'Rice'};
  const dummyErr = new Error('dummy');

  beforeEach(() => jest.resetAllMocks())

  it('should resolve with true if item is not sold by weight', async () => {
    await itemByWeightValidatorMock(item);

    expect(categoryValidatorMock).not.toHaveBeenCalled();
  })

  it('should validate category for item sold by weight', async () => {
    categoryValidatorMock.mockResolvedValue(true);

    await itemByWeightValidatorMock(itemSoldByWeight);

    expect(categoryValidatorMock).toHaveBeenCalledWith(itemSoldByWeight);
  })

  it('should reject on invalid category errors for item sold by weight', async () => {
    categoryValidatorMock.mockRejectedValue(dummyErr);

    const errThr = await itemByWeightValidatorMock(itemSoldByWeight).catch(e => e);

    expect(errThr).toEqual(dummyErr);
    expect(categoryValidatorMock).toHaveBeenCalledWith(itemSoldByWeight);
  });

  it('should reject when category is given for item not sold by weight', async () => {
    const errorThrown = await itemByWeightValidatorMock({...itemSoldByWeight, byWeight: false}).catch(e => e);

    expect(errorThrown).toBeInstanceOf(InvalidItemException);
    expect(errorThrown.message).toEqual(ERRORS.CATEGORY_NOT_ALLOWED);
    expect(categoryValidatorMock).not.toHaveBeenCalled();
  });

  it('should reject when no category is given for item sold by weight', async () => {
    const errorThrown = await itemByWeightValidatorMock({...itemSoldByWeight, category: null}).catch(e => e);

    expect(errorThrown).toBeInstanceOf(InvalidItemException);
    expect(errorThrown.message).toEqual(ERRORS.INVALID_CATEGORY);
    expect(categoryValidatorMock).not.toHaveBeenCalled();
  });
});
