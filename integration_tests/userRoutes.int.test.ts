import * as request from 'supertest';

import app from '../src/app';
import constants from '../src/constants';
import * as usersRepo from '../src/repositories/usersRepo';
import {tearDownUsers, setUpUsers} from './dataHelper';

const {USER_ROUTE_ERRORS: {INVALID_AUTH_ERROR, UNAUTHORISED, FORBIDDEN}, ROLES} = constants;

describe('Users routes', () => {
  const agent = request.agent(app);
  let userIds;
  const user = {name: 'user1', password: 'user1pwd', role: ROLES.USER};
  const anotherUser = {name: 'anotherUser1', password: 'anotherUser1pwd', role: ROLES.USER};
  const userToDelete = {name: 'userToDelete1', password: 'userToDelete1pwd', role: ROLES.USER};
  const admin = {name: 'admin1', password: 'admin1pwd', role: ROLES.ADMIN};
  const userToUpdate = {name: 'userToUpdate1', password: 'userToUpdate1pwd', role: ROLES.USER};
  const userToBeAdmin = {name: 'userToBeAdmin1', password: 'userToBeAdmin1pwd', role: ROLES.USER};

  const LOGIN_ROUTE = '/api/users/authenticate';
  const LOGOUT_ROUTE = '/api/users/logout';
  const GET_MY_DETAILS = '/api/users/me';

  beforeAll(async () => {
    userIds = await setUpUsers([user, anotherUser, userToDelete, admin,
      userToUpdate, userToBeAdmin]);
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

  describe('delete /api/users', () => {
    it('should delete logged in user and invalidate his session', async () => {
      const adminAgent = request.agent(app);
      const userToDeleteAgent = request.agent(app);
      await userToDeleteAgent.post(LOGIN_ROUTE)
        .auth(userToDelete.name, userToDelete.password)
        .expect(200);
      await adminAgent.post(LOGIN_ROUTE)
        .auth(admin.name, admin.password)
        .expect(200);
      await adminAgent.delete(`/api/users/${userIds[2]}`).expect(200);
      const userInDb = await usersRepo.findById(userIds[2]);
      expect(userInDb).toBeUndefined();
      return userToDeleteAgent.get(GET_MY_DETAILS).expect(401);
    });

    it('should return 403 Forbidden for other users', async () => {
      await agent.post(LOGIN_ROUTE)
        .auth(anotherUser.name, anotherUser.password)
        .expect(200);
      return agent
        .delete(`/api/users/${userIds[0]}`)
        .expect(403)
        .then(r => expect(r.body).toEqual({errors: [FORBIDDEN]}));
    });
  });

  describe('create /users', () => {
    const newUser = {name: 'userToCreate', password: 'userToCreatePwd'};
    let createdUserId;

    it('should create user', async () => {
      await agent.post(LOGIN_ROUTE).auth(admin.name, admin.password).expect(200);
      createdUserId = await agent
        .post('/api/users')
        .send({role: ROLES.USER, ...newUser})
        .expect(200)
        .then(r => r.body.id);
      const createdUser = await usersRepo.find(newUser);
      expect(createdUser).toEqual({ id: createdUserId, name: newUser.name});
    });

    it('should throw error when invalid role is passed', async () => {
      await agent.post(LOGIN_ROUTE).auth(admin.name, admin.password).expect(200);
      await agent
        .post('/api/users')
        .send({role: 'blah', ...newUser})
        .expect(400)
        .then(r => expect(r.body).toEqual({errors:
          ["null value in column \"role_id\" violates not-null constraint"]}));
    });

    it('should throw error when duplicate name is passed', async () => {
      await agent.post(LOGIN_ROUTE).auth(admin.name, admin.password).expect(200);
      await agent
        .post('/api/users')
        .send({role: ROLES.ADMIN, ...admin})
        .expect(400)
        .then(r => expect(r.body).toEqual({errors:
          ["duplicate key value violates unique constraint \"users_name_key\""]}));
    });

    it('should return 403 Forbidden for normal users', async () => {
      await agent.post(LOGIN_ROUTE).auth(user.name, user.password).expect(200);
      return agent
        .post('/api/users')
        .expect(403)
        .then(r => expect(r.body).toEqual({errors: [FORBIDDEN]}));
    });

    afterEach(() => tearDownUsers([createdUserId]));
  });

  describe('put /users/id', () => {
    it('should allow updates of name, role and password', async () => {
      await agent.post(LOGIN_ROUTE).auth(admin.name, admin.password).expect(200);
      const newUserData = {name: 'newName', role: ROLES.USER, password: 'newPwd'};
      await agent
        .put(`/api/users/${userIds[4]}`)
        .send(newUserData)
        .expect(200);
      const updatedUser = await usersRepo.find(newUserData);
      expect(updatedUser).toEqual({id: userIds[4], name: newUserData.name});
    });

    it('should change privileges on role changes', async () => {
      const userRoleChangeAgent = request.agent(app);
      await agent.post(LOGIN_ROUTE).auth(admin.name, admin.password).expect(200);
      await userRoleChangeAgent.post(LOGIN_ROUTE)
        .auth(userToBeAdmin.name, userToBeAdmin.password)
        .expect(200);
      await userRoleChangeAgent.delete('/api/users/0').expect(403);
      await agent
        .put(`/api/users/${userIds[5]}`)
        .send({...userToBeAdmin, role: ROLES.ADMIN})
        .expect(200);
        await userRoleChangeAgent.delete('/api/users/0').expect(200);
    });

    it('should return 403 Forbidden for normal users', async () => {
      await agent.post(LOGIN_ROUTE).auth(user.name, user.password).expect(200);
      return agent
        .put(`/api/users/${userIds[5]}`)
        .expect(403)
        .then(r => expect(r.body).toEqual({errors: [FORBIDDEN]}));
    });

    it('should return 400 for error data', async () => {
      await agent.post(LOGIN_ROUTE).auth(admin.name, admin.password).expect(200);
      return agent
        .put(`/api/users/${userIds[5]}`)
        .send({...userToBeAdmin, role: 'invalid'})
        .expect(400)
        .then(r => expect(r.body).toEqual({errors: ["null value in column \"role_id\" violates not-null constraint"]}));
    })
  });
});
