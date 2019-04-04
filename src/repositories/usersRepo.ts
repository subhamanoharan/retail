import {query} from './pg-client';
import {IUser} from '../interfaces';

const create = async (user: IUser): Promise<number> => {
  const insertQuery = `INSERT INTO users(name, password) values ($1, crypt($2, gen_salt('bf'))) RETURNING id;`
  const values = [user.name, user.password];
  const {rows: [{id}]} = await query(insertQuery, values);
  return id;
};

const remove = (id) => {
  const delQuery = `DELETE FROM users where id='${id}';`
  return query(delQuery);
};

const find = async ({name, password}: IUser): Promise<any> => {
  const findQuery = `SELECT u.id, u.name from users u where u.name='${name}'
   and u.password = crypt('${password}', u.password);`
  const {rows: [user]} = await query(findQuery);
  return user;
}

const findById = async (userId): Promise<any> => {
  const findQuery = `SELECT u.id, u.name from users u where u.id=${userId};`
  const {rows: [user]} = await query(findQuery);
  return user;
}

export { create, remove, find, findById };
