import getPgClient from './pg-client';

interface IItem {
  name: string;
  mrp: number;
  sp: number;
}
const insert = async (item: IItem): Promise<number> => {
  const client = getPgClient();
  await client.connect();
  const query = 'INSERT INTO items(name, mrp, sp) values($1, $2, $3) RETURNING id;'
  const values = [item.name, item.mrp, item.sp];
  const {rows: [{id}]} = await client.query(query, values);
  await client.end();
  return id;
};

export {insert};
