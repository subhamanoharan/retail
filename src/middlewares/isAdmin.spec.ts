import isAdmin from './isAdmin';
import ForbiddenException from '../exceptions/forbiddenException';

describe('isAdmin', () => {
  it('should call next if user is admin', () => {
    const reqMock = {user: {role: 'admin'}};
    const resMock = {};
    const nextMock = jest.fn();

    isAdmin(reqMock, resMock, nextMock);

    expect(nextMock).toHaveBeenCalledWith()
  });

 it('should call next with error if not admin', () => {
   const reqMock = {user: {role: 'blah'}};
    const resMock = {};
    const nextMock = jest.fn();

    isAdmin(reqMock, resMock, nextMock);

    expect(nextMock).toHaveBeenCalledWith(expect.any(ForbiddenException))
  });
});
