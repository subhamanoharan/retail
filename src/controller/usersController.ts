import * as lodash from 'lodash';

import credsExtractor from './../services/credsExtractor';
import usersService from '../services/usersService';
import constants from '../constants';

const {USER_ROUTE_ERRORS} = constants;

const login = (req, res) => {
  const creds = credsExtractor(req.headers);
  if (lodash.isEmpty(creds)) {
    return res.status(400).json({ errors: [USER_ROUTE_ERRORS.MISSING_AUTH] });
  }
  return usersService.authenticate({name: creds.name, password: creds.password})
    .then((user) => {
      req.session.user = user;
      res.send();
    })
    .catch((error) => res.status(400).json({errors: [error.message]}));
}

const logout = (req, res) => {
  const {session} = req;
  req.session.destroy();
  res.send();
}

const create = (req, res, next) => {
  const { name, role, password } = req.body;
  return usersService.create({ name, role, password })
    .then((id) => res.json({id}))
    .catch(error => next(error));
};

const update = (req, res, next) => {
  const { name, role, password } = req.body;
  return usersService.update(req.params.userId, { name, role, password })
    .then(() => res.send())
    .catch(error => next(error));
};

const get = (req, res, next) => {
  const {id: userId} = req.user;
  return usersService.get(userId)
    .then((user) => res.json(user))
    .catch((e) => next(e));
};

const remove = (req, res) =>
  usersService.remove(req.params.userId).then(() => res.send());

export default {login, logout, get, remove, create, update };
