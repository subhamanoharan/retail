import {IUserCreds, IUser} from '../interfaces';
import constants from '../constants';
import * as usersRepo from '../repositories/usersRepo';
import UserDoesNotExistException from '../exceptions/userDoesNotExistException';
import UserDbException from '../exceptions/userDbException';

const {USER_ROUTE_ERRORS: {INVALID_AUTH_ERROR}} = constants;

const authenticate = async (userCreds: IUserCreds) => {
  const user = await usersRepo.find(userCreds);
  return user ? Promise.resolve(user): Promise.reject(new Error(INVALID_AUTH_ERROR));
};

const findById = async (userId): Promise<IUser> => {
  const user = await usersRepo.findById(userId);
  return user ? {id: user.id, name: user.name, role: user.role} : Promise.reject({});
};

const get = async (userId): Promise<IUser> => {
  const user: IUser = await usersRepo.findById(userId);
  return user || Promise.reject(new UserDoesNotExistException());
};

const remove = (userId) => usersRepo.remove(userId);

const create = ({name, password, role}) => usersRepo.create({name, password, role})
  .catch((e) => Promise.reject(new UserDbException(e.message)));

const update = (userId, {name, password, role}) => usersRepo.update(userId, {name, password, role})
  .catch((e) => Promise.reject(new UserDbException(e.message)));

export default {authenticate, findById, get, remove, create, update };
