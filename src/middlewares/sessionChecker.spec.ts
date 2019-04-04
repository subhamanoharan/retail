import sessionChecker from './sessionChecker';
import usersServiceMock from './../services/usersService';
import UnauthorisedUserException from '../exceptions/unauthorisedUserException';
import constants from '../constants';

jest.mock('./../services/usersService');

describe('Session checker', () => {
  constants.OPEN_ROUTES.forEach((route) =>
    it(`should not check session for open route - ${route}`, () => {
      const req = {originalUrl: route};
      const res = {};
      const next = jest.fn();

      sessionChecker(req, res, next);

      expect(next).toHaveBeenCalledWith();
    })
  );

  it('should throw error when there is no session for other routes', () => {
    const route = '/someroute'
    const req = {originalUrl: route, session: {}};
    const res = {};
    const next = jest.fn();

    sessionChecker(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(UnauthorisedUserException));
  });

  it('should set req.user for valid user in session', async () => {
    usersServiceMock.findById.mockResolvedValue('user');
    const route = '/someroute'
    const userInSession = {id: 1, name: 'blah'};
    const req = {originalUrl: route, session: {user: userInSession}};
    const res = {};
    const next = jest.fn();

    await sessionChecker(req, res, next);

    expect(usersServiceMock.findById).toHaveBeenCalledWith(userInSession.id);
    expect(req.user).toEqual('user');
    expect(next).toHaveBeenCalledWith();
  });

  it('should throw error for invalid user in session', async () => {
    usersServiceMock.findById.mockRejectedValue();
    const route = '/someroute'
    const userInSession = {id: 1, name: 'blah'};
    const req = {originalUrl: route, session: {user: userInSession}};
    const res = {};
    const next = jest.fn();

    await sessionChecker(req, res, next);

    expect(usersServiceMock.findById).toHaveBeenCalledWith(userInSession.id);
    expect(req.user).not.toBeDefined();
    expect(next).toHaveBeenCalledWith(expect.any(UnauthorisedUserException));
  });
});
