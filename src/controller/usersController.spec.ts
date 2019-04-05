import usersController from './usersController';
import usersServiceMock from '../services/usersService';
import * as credsExtractorMock from '../services/credsExtractor';
import constants from '../constants';

jest.mock('../services/usersService');
jest.mock('../services/credsExtractor');

const {USER_ROUTE_ERRORS, ROLES} = constants;

describe('UsersController', () => {
  const nonArrowFn = function() { return this; };
  const name = 'name';
  const password = 'password';

  beforeEach(() => jest.clearAllMocks())
  describe('login', () => {
    it('should return 400 for missing auth headers', async () => {
      const headers = {h1: 1, h2: 2}
      const reqMock = {headers};
      const resMock = {status: jest.fn(nonArrowFn), json: jest.fn(nonArrowFn)};
      (credsExtractorMock.default as any).mockReturnValue({});

      await usersController.login(reqMock, resMock);

      expect(credsExtractorMock.default).toHaveBeenCalledWith(headers);
      expect(resMock.status).toHaveBeenCalledWith(400);
      expect(resMock.json).toHaveBeenCalledWith({ errors: [USER_ROUTE_ERRORS.MISSING_AUTH] });
    });

    it('should return 200 and set user session on successful login', async () => {
      const headers = {h1: 1, h2: 2}
      const reqMock = {headers, session: {}};
      const resMock = {send: jest.fn()};
      (credsExtractorMock.default as any).mockReturnValue({name, password});
      (usersServiceMock.authenticate as any).mockResolvedValue('user');

      await usersController.login(reqMock, resMock);

      expect(credsExtractorMock.default).toHaveBeenCalledWith(headers);
      expect(usersServiceMock.authenticate).toHaveBeenCalledWith({name, password});
      expect(resMock.send).toHaveBeenCalled();
      expect((reqMock.session as any).user).toEqual('user');
    });

    it('should return 400 and not set user session on failed login', async () => {
      const headers = {h1: 1, h2: 2}
      const errorThrown = new Error('Invalid Authentication Credentials');
      const reqMock = {headers, session: {}};
      const resMock = {status: jest.fn(nonArrowFn), json: jest.fn(nonArrowFn)};
      (credsExtractorMock.default as any).mockReturnValue({name, password});
      (usersServiceMock.authenticate as any).mockRejectedValue(errorThrown);

      await usersController.login(reqMock, resMock);

      expect(credsExtractorMock.default).toHaveBeenCalledWith(headers);
      expect(usersServiceMock.authenticate).toHaveBeenCalledWith({name, password});
      expect(resMock.status).toHaveBeenCalledWith(400);
      expect(resMock.json).toHaveBeenCalledWith({errors: [errorThrown.message]});
      expect(reqMock.session).toEqual({});
    });
  });

  describe('logout', () => {
    it('should clear user session', () => {
      const reqMock = {session: {destroy: jest.fn()}};
      const resMock = {send: jest.fn(nonArrowFn)};

      usersController.logout(reqMock, resMock);

      expect(reqMock.session.destroy).toHaveBeenCalled();
      expect(resMock.send).toHaveBeenCalled();
    })
  });

  describe('get user', () => {
    const user = {id: 12, name: 'blah'};
    const reqMock = {user: {id: user.id}};

    it('should get user by id', async () => {
      (usersServiceMock.get as any).mockResolvedValue(user);
      const resMock = {json: jest.fn()};

      await usersController.get(reqMock, resMock);

      expect(usersServiceMock.get).toHaveBeenCalledWith(user.id);
      expect(resMock.json).toHaveBeenCalledWith(user);
    });

    it('should call next with error if user does not exist', async () => {
      (usersServiceMock.get as any).mockRejectedValue('error');
      const resMock = {};
      const nextMock = jest.fn();

      await usersController.get(reqMock, resMock, nextMock);

      expect(usersServiceMock.get).toHaveBeenCalledWith(user.id);
      expect(nextMock).toHaveBeenCalledWith('error');
    });
  });

  describe('remove', () => {
    it('should remove the user', async () => {
      const userId = 12;
      const reqMock = {params: {userId}};
      const resMock = {send: jest.fn()};
      (usersServiceMock.remove as any).mockResolvedValue(Promise.resolve());

      await usersController.remove(reqMock, resMock);

      expect(usersServiceMock.remove).toHaveBeenCalledWith(userId);
      expect(resMock.send).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    const newUser = {name: 'userToCreate', password: 'userToCreatePwd', role: ROLES.USER};

    it('should create user', async () => {
      const reqMock = {body: {...newUser}};
      const resMock = {json: jest.fn()};
      (usersServiceMock.create as any).mockResolvedValue(Promise.resolve('newId'));

      await usersController.create(reqMock, resMock);

      expect(usersServiceMock.create).toHaveBeenCalledWith(newUser);
      expect(resMock.json).toHaveBeenCalledWith({id: 'newId'});
    });

    it('should call next with errors', async () => {
      const reqMock = {body: {...newUser}};
      const resMock = {status: jest.fn(nonArrowFn), json: jest.fn(nonArrowFn)};
      const nextMock = jest.fn();
      (usersServiceMock.create as any).mockRejectedValue({error: 'error'});

      await usersController.create(reqMock, resMock, nextMock);

      expect(usersServiceMock.create).toHaveBeenCalledWith(newUser);
      expect(nextMock).toHaveBeenCalledWith({error: 'error'});
    });
  });
});
