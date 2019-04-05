import {query} from './pg-client';
import {IUserCreds, IUser} from '../interfaces';

const create = async (user): Promise<number> => {
  const insertQuery = `INSERT INTO users(name, password, role_id)
   values ($1, crypt($2, gen_salt('bf')), (SELECT id from roles where name=$3)) RETURNING id;`
  const values = [user.name, user.password, user.role];
  const {rows: [{id}]} = await query(insertQuery, values);
  return id;
};

const update = async (userId, user) => {
  const updateQuery = `UPDATE users set name=$1, password=crypt($2, gen_salt('bf')),
    role_id=(SELECT id from roles where name=$3) where id=$4;`;
  const values = [user.name, user.password, user.role, userId];
  await query(updateQuery, values);
};

const remove = (id) => {
  const delQuery = `DELETE FROM users where id='${id}';`
  return query(delQuery);
};

const find = async ({name, password}: IUserCreds): Promise<IUserSession> => {
  const findQuery = `SELECT u.id, u.name from users u where u.name='${name}'
   and u.password = crypt('${password}', u.password);`
  const {rows: [user]} = await query(findQuery);
  return user;
}

const findById = async (userId): Promise<IUser> => {
  const findQuery = `SELECT u.id, u.name, r.name as role from users u, roles r
   where u.id=${userId} and r.id=u.role_id;`
  const {rows: [user]} = await query(findQuery);
  return user;
}

export { create, remove, find, findById, update };
