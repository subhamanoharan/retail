import {query} from './pg-client';

interface IItem {
  name: string;
  mrp: number;
  sp: number;
}

const insert = async (item: IItem): Promise<number> => {
  const insertQuery = 'INSERT INTO items(name, mrp, sp) values($1, $2, $3) RETURNING id;'
  const values = [item.name, item.mrp, item.sp];
  const {rows: [{id}]} = await query(insertQuery, values);
  return id;
};

const all = async () => {
  const getAllQuery = 'SELECT * from items;'
  const {rows} = await query(getAllQuery);
  return rows;
}
export {insert, all};
