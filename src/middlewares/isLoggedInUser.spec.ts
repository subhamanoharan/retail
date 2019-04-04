import isLoggedInUser from './isLoggedInUser';
import ForbiddenException from '../exceptions/forbiddenException';

describe('isLoggedInUser', () => {
  it('should call next if user id matches logged in user id', () => {
    const reqMock = {params: {userId: '1'}, session: {user: {id: 1}}};
    const resMock = {};
    const nextMock = jest.fn();

    isLoggedInUser(reqMock, resMock, nextMock);

    expect(nextMock).toHaveBeenCalledWith()
  });

 it('should call next with error if user id does not match logged in user id', () => {
    const reqMock = {params: {userId: 1}, session: {user: {id: 2}}};
    const resMock = {};
    const nextMock = jest.fn();

    isLoggedInUser(reqMock, resMock, nextMock);

    expect(nextMock).toHaveBeenCalledWith(expect.any(ForbiddenException))
  });
});
