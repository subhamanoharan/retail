import priceValidator from './priceValidator';
import constants from '../../constants';
import InvalidItemException from './../../exceptions/invalidItemException';

const {ERRORS} = constants;

describe('Price validator', () => {

  it('should resolve if price is valid', async () => {
    const item = {sp: 12};
    const result = await priceValidator(item);

    expect(result).toBe(true);
  });

  it('should reject if price is invalid', async () => {
    const item = {sp: '123'};
    const errorThrown = await priceValidator(item).catch(e => e);

    expect(errorThrown).toBeInstanceOf(InvalidItemException);
    expect(errorThrown.message).toEqual(ERRORS.INVALID_PRICE);
  });
  
  it('should reject if price is negative', async () => {
    const item = {sp: -12};
    const errorThrown = await priceValidator(item).catch(e => e);

    expect(errorThrown).toBeInstanceOf(InvalidItemException);
    expect(errorThrown.message).toEqual(ERRORS.INVALID_PRICE);
  });
});
