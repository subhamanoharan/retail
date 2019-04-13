import {query} from './pg-client';

const insert = async (category): Promise<number> => {
  const insertQuery = `INSERT INTO categories(name) values ($1) RETURNING id;`
  const values = [category.name];
  const {rows: [{id}]} = await query(insertQuery, values);
  return id;
};

const update = async (categoryId, category): Promise<number> => {
  const insertQuery = `UPDATE categories set name=$1 where id=$2;`
  const values = [category.name, categoryId];
  await query(insertQuery, values);
  return Promise.resolve();
};

const findById = async (categoryId): Promise<any> => {
  const findQuery = `SELECT * from categories where id=${categoryId};`
  const {rows: [category]} = await query(findQuery);
  return category;
};

const deleteAll = () => {
  const deleteAllQuery = 'DELETE from categories;'
  return query(deleteAllQuery);
};

const getId = async ({name}) => {
  const getCategoryIdQuery = `SELECT id from categories where name='${name}' limit 1;`
  const {rows: [category]} = await query(getCategoryIdQuery);
  return category ? category.id : category;
};


const all = async () => {
  const getAllQuery = 'SELECT * from categories;'
  const {rows} = await query(getAllQuery);
  return rows;
}

const remove = (id) => {
  const delQuery = `DELETE FROM categories where id='${id}';`
  return query(delQuery);
};

export { findById, deleteAll, insert, getId, all, remove, update };
