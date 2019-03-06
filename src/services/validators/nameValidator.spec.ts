import nameValidator from './nameValidator';
import constants from '../../constants';
import InvalidItemException from './../../exceptions/invalidItemException';

const {ERRORS, NAME_MAX_LENGTH} = constants;

describe('Name validator', () => {

  it('should resolve if name is valid', async () => {
    const item = {name: 'some'};
    const result = await nameValidator(item);

    expect(result).toBe(true);
  });

  it('should reject if name is invalid', async () => {
    const item = {name: 90};
    const errorThrown = await nameValidator(item).catch(e => e);

    expect(errorThrown).toBeInstanceOf(InvalidItemException);
    expect(errorThrown.message).toEqual(ERRORS.INVALID_NAME);
  });

  it('should reject if name is empty', async () => {
    const item = {name: ''};
    const errorThrown = await nameValidator(item).catch(e => e);

    expect(errorThrown).toBeInstanceOf(InvalidItemException);
    expect(errorThrown.message).toEqual(ERRORS.INVALID_NAME);
  });

  it('should reject if name is very long', async () => {
    const item = {name:  new Array(NAME_MAX_LENGTH + 1).join('s')};
    const errorThrown = await nameValidator(item).catch(e => e);

    expect(errorThrown).toBeInstanceOf(InvalidItemException);
    expect(errorThrown.message).toEqual(ERRORS.INVALID_NAME);
  });
});
