import categoryValidator from './categoryValidator';
import constants from '../../../constants';
import InvalidItemException from './../../../exceptions/invalidItemException';

import * as categoriesRepoMock from '../../../repositories/categoriesRepo';

jest.mock('../../../repositories/categoriesRepo');

const {ERRORS} = constants;

describe('Category validator', () => {
  const item = {category: 'ABCD'};

  beforeEach(() => jest.resetAllMocks())

  it('should resolve if category exists', async () => {
    const categoryId = 12;
    (categoriesRepoMock.getId as any).mockResolvedValue(categoryId);

    const result = await categoryValidator(item);

    expect(result).toBe(true);
    expect(categoriesRepoMock.getId).toHaveBeenCalledWith({name: item.category});
  });

  it('should reject if category does not exist', async () => {
    (categoriesRepoMock.getId as any).mockResolvedValue(null);

    const errorThrown = await categoryValidator(item).catch(e => e);

    expect(errorThrown).toBeInstanceOf(InvalidItemException);
    expect(errorThrown.message).toEqual(ERRORS.INVALID_CATEGORY);
    expect(categoriesRepoMock.getId).toHaveBeenCalledWith({name: item.category});
  });
});
