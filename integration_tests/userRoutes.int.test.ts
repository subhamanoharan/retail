import * as request from 'supertest';

import app from '../src/app';
import constants from '../src/constants';
import {tearDownUsers, setUpUsers} from './dataHelper';

const {USER_ROUTE_ERRORS: {INVALID_AUTH_ERROR}} = constants;

describe('Users routes', () => {
  const agent = request.agent(app);
  let userIds;
  const user = {name: 'user1', password: 'user1pwd'};

  const LOGIN_ROUTE = '/api/users/authenticate';
  const LOGOUT_ROUTE = '/api/users/logout';

  beforeAll(async () => {
    userIds = await setUpUsers([user]);
  });

  afterAll(() => tearDownUsers(userIds));

  describe('get /api/users/me', () => {
    it('should return user details', async () => {
      await agent.post(LOGIN_ROUTE).auth(user.name, user.password).expect(200);
      await agent
        .get('/api/users/me')
        .expect(200)
        .then(r => expect(r.body).toEqual({id: userIds[0], name: user.name}));
    });
  });

  describe('login', () => {
    it('should return 200 on successful login', () =>
      agent.post(LOGIN_ROUTE).auth(user.name, user.password).expect(200));

    it('should return 400 on invalid name', () => {
      return agent.post(LOGIN_ROUTE)
        .auth('random', 'random')
        .expect(400)
        .then(r => expect(r.body).toEqual({errors: [INVALID_AUTH_ERROR]}));
    });

    it('should return 400 on invalid password', () => {
      return agent.post(LOGIN_ROUTE)
        .auth(user.name, 'random')
        .expect(400)
        .then(r => expect(r.body).toEqual({errors: [INVALID_AUTH_ERROR]}));
    });
  });

  describe('logout', () => {
    it('should clear user session on logout', async () => {
      await agent.post(LOGIN_ROUTE).auth(user.name, user.password).expect(200);
      await agent.post(LOGOUT_ROUTE).expect(200);
    });
  });
});
