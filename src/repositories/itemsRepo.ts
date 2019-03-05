import {query} from './pg-client';

interface IItem {
  name: string;
  barcode: string;
  sp: number;
}

const insert = async (item: IItem): Promise<number> => {
  const insertQuery = 'INSERT INTO items(name, barcode, sp) values($1, $2, $3) RETURNING id;'
  const values = [item.name, item.barcode, item.sp];
  const {rows: [{id}]} = await query(insertQuery, values);
  return id;
};

const all = async () => {
  const getAllQuery = 'SELECT * from items;'
  const {rows} = await query(getAllQuery);
  return rows;
}

const findById = async (itemId): Promise<any> => {
  const findQuery = `SELECT * from items where id=${itemId};`
  const {rows: [item]} = await query(findQuery);
  return item;
}

const deleteAll = () => {
  const deleteAllQuery = 'DELETE from items;'
  return query(deleteAllQuery);
}

const doesBarcodeExist = async (item) => {
  const existsQuery = `select exists(SELECT 1 from items where barcode='${item.barcode}');`
  const {rows: [{exists}]} = await query(existsQuery);
  return exists;
}

export {insert, all, findById, deleteAll, doesBarcodeExist};
