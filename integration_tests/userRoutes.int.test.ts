import * as request from 'supertest';

import app from '../src/app';
import constants from '../src/constants';
import {tearDownUsers, setUpUsers} from './dataHelper';

const {USER_ROUTE_ERRORS: {INVALID_AUTH_ERROR, UNAUTHORISED}, ROLES} = constants;

describe('Users routes', () => {
  const agent = request.agent(app);
  let userIds;
  const user = {name: 'user1', password: 'user1pwd', role: ROLES.USER};

  const LOGIN_ROUTE = '/api/users/authenticate';
  const LOGOUT_ROUTE = '/api/users/logout';
  const GET_MY_DETAILS = '/api/users/me';

  beforeAll(async () => {
    userIds = await setUpUsers([user]);
  });

  afterAll(() => tearDownUsers(userIds));

  describe('get /api/users/me', () => {
    it('should return user details', async () => {
      await agent.post(LOGIN_ROUTE).auth(user.name, user.password).expect(200);
      await agent
        .get(GET_MY_DETAILS)
        .expect(200)
        .then(r => expect(r.body).toEqual({id: userIds[0], name: user.name, role: ROLES.USER}));
    });

    it('should return 401 if no user is logged in', () => {
      const noUserAgent = request.agent(app);
      return noUserAgent
        .get(GET_MY_DETAILS)
        .expect(401)
        .then(r => expect(r.body).toEqual({ errors: [UNAUTHORISED]}));
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
      await agent.get(GET_MY_DETAILS).expect(401);
    });
  });

});
