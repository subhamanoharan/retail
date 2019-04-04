import {IUser} from '../interfaces';
import constants from '../constants';
import * as usersRepo from '../repositories/usersRepo';
import UserDoesNotExistException from '../exceptions/userDoesNotExistException';

const {USER_ROUTE_ERRORS: {INVALID_AUTH_ERROR}} = constants;

const authenticate = async (userCreds: IUser) => {
  const user = await usersRepo.find(userCreds);
  return user ? Promise.resolve(user): Promise.reject(new Error(INVALID_AUTH_ERROR));
};

const findById = async (userId) => {
  const user = await usersRepo.findById(userId);
  return user || Promise.reject({});
};

const get = async (userId) => {
  const user = await usersRepo.findById(userId);
  return user || Promise.reject(new UserDoesNotExistException());
};

export default {authenticate, findById, get};
