import usersService from './usersService';
import constants from '../constants';
import * as usersRepoMock from '../repositories/usersRepo';
import UserDoesNotExistException from '../exceptions/userDoesNotExistException';

const {USER_ROUTE_ERRORS: {INVALID_AUTH_ERROR}} = constants;

jest.mock('../repositories/usersRepo');

describe('UsersService', () => {
  const user = {name: 'user', id: 1};

  describe('authenticate', () => {
    const userCreds = {name: 'name', password: 'something'};

    it('should return user if found', async () => {
      (usersRepoMock.find as any).mockResolvedValue('user');

      const userFound = await usersService.authenticate(userCreds);

      expect(usersRepoMock.find).toHaveBeenCalledWith(userCreds);
      expect(userFound).toEqual('user');
    });

    it('should reject if user has passed invalid credentials', async () => {
      (usersRepoMock.find as any).mockResolvedValue(undefined);
      const errorThrown = await usersService.authenticate(userCreds).catch(e => e);
      expect(errorThrown.message).toEqual(INVALID_AUTH_ERROR);
      expect(usersRepoMock.find).toHaveBeenCalledWith(userCreds);
    });
  });

  describe('findById', () => {
    it('should find user by id', async () => {
      (usersRepoMock.findById as any).mockResolvedValue(user);

      const actualUser = await usersService.findById(user.id);

      expect(usersRepoMock.findById).toHaveBeenCalledWith(user.id);
      expect(actualUser).toEqual(user);
    });

    it('should reject if user not found', async () => {
      (usersRepoMock.findById as any).mockResolvedValue(undefined);

      expect(usersService.findById(user.id)).rejects.toEqual({});

      expect(usersRepoMock.findById).toHaveBeenCalledWith(user.id);
    });
  });
  describe('get', () => {
    it('should get user by id', async () => {
      (usersRepoMock.findById as any).mockResolvedValue(user);

      const actualUser = await usersService.get(user.id);

      expect(usersRepoMock.findById).toHaveBeenCalledWith(user.id);
      expect(actualUser).toEqual(user);
    });

    it('should reject if user not found', async () => {
      (usersRepoMock.findById as any).mockResolvedValue(undefined);

      expect(usersService.get(user.id)).rejects.toEqual(expect.any(UserDoesNotExistException));

      expect(usersRepoMock.findById).toHaveBeenCalledWith(user.id);
    });
  });
});
