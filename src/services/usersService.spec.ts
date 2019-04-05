import usersService from './usersService';
import constants from '../constants';
import * as usersRepoMock from '../repositories/usersRepo';
import UserDoesNotExistException from '../exceptions/userDoesNotExistException';
import UserDbException from '../exceptions/userDbException';

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

  describe('remove', () => {
    const userId = 123;
    it('should remove user', async () => {
      (usersRepoMock.remove as any).mockResolvedValue(true);

      await usersService.remove(userId);

      expect(usersRepoMock.remove).toHaveBeenCalledWith(userId);
    });
  });

  describe('create', () => {
    it('should create user', async () => {
      const user = {name: 'blah', password: 'password', role: 'role'};
      (usersRepoMock.create as any).mockResolvedValue(123);

      const id = await usersService.create(user);

      expect(usersRepoMock.create).toHaveBeenCalledWith(user);
      expect(id).toEqual(123);
    });

    it('should throw db error', async () => {
      const user = {name: 'blah', password: 'password', role: 'role'};
      (usersRepoMock.create as any).mockRejectedValue(new Error('dummy'));

      const errorThrown = await usersService.create(user).catch(e => e);

      expect(usersRepoMock.create).toHaveBeenCalledWith(user);
      expect(errorThrown).toEqual(expect.any(UserDbException));
      expect(errorThrown.message).toEqual('dummy');
    });

  })

  describe('update', () => {
    const user = {name: 'blah', password: 'password', role: 'role'};
    const userId = 3;
    it('should update user', async () => {
      (usersRepoMock.update as any).mockResolvedValue();

      await usersService.update(userId, user);

      expect(usersRepoMock.update).toHaveBeenCalledWith(userId, user);
    });

    it('should throw db error', async () => {
      const user = {name: 'blah', password: 'password', role: 'role'};
      (usersRepoMock.update as any).mockRejectedValue(new Error('dummy'));

      const errorThrown = await usersService.update(userId, user).catch(e => e);

      expect(usersRepoMock.update).toHaveBeenCalledWith(userId, user);
      expect(errorThrown).toEqual(expect.any(UserDbException));
      expect(errorThrown.message).toEqual('dummy');
    });
  })
});
