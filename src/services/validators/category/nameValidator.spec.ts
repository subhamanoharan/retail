import nameValidator from './nameValidator';
import constants from '../../../constants';
import InvalidCategoryException from './../../../exceptions/invalidCategoryException';

import * as categoriesRepoMock from '../../../repositories/categoriesRepo';

jest.mock('../../../repositories/categoriesRepo');

const {CATEGORY_ROUTE_ERRORS: ERRORS, ERRORS: {INVALID_NAME}, NAME_MAX_LENGTH} = constants;

describe('Name validator', () => {
  const category = {name: 'ABCD'};

  beforeEach(() => jest.resetAllMocks())

  it('should resolve if name exists and is its own', async () => {
    const categoryId = 12;
    (categoriesRepoMock.getId as any).mockResolvedValue(categoryId);

    const result = await nameValidator(category, categoryId);

    expect(result).toBe(true);
    expect(categoriesRepoMock.getId).toHaveBeenCalledWith(category);
  });

  it('should reject if name is empty', async () => {
    const category = {name: ''};
    const errorThrown = await nameValidator(category).catch(e => e);

    expect(errorThrown).toBeInstanceOf(InvalidCategoryException);
    expect(errorThrown.message).toEqual(INVALID_NAME);
    expect(categoriesRepoMock.getId).not.toHaveBeenCalled();
  });

  it('should reject if name is very long', async () => {
    const category = {name:  new Array(NAME_MAX_LENGTH + 1).join('s')};
    const errorThrown = await nameValidator(category).catch(e => e);

    expect(errorThrown).toBeInstanceOf(InvalidCategoryException);
    expect(errorThrown.message).toEqual(INVALID_NAME);
    expect(categoriesRepoMock.getId).not.toHaveBeenCalled();
  });


  it('should reject if name exists for another category', async () => {
    const categoryId = 12;

    (categoriesRepoMock.getId as any).mockResolvedValue(13);

    const errorThrown = await nameValidator(category, categoryId).catch(e => e);

    expect(errorThrown).toBeInstanceOf(InvalidCategoryException);
    expect(errorThrown.message).toEqual(ERRORS.CATEGORY_EXISTS(category));
    expect(categoriesRepoMock.getId).toHaveBeenCalledWith(category);
  });

  it('should reject if name exists and current category does not exist yet', async () => {
    (categoriesRepoMock.getId as any).mockResolvedValue(13);

    const errorThrown = await nameValidator(category).catch(e => e);

    expect(errorThrown).toBeInstanceOf(InvalidCategoryException);
    expect(errorThrown.message).toEqual(ERRORS.CATEGORY_EXISTS(category));
    expect(categoriesRepoMock.getId).toHaveBeenCalledWith(category);
  });
});
