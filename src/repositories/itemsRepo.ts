import getPgClient from './pg-client';

const insert = async (item) => {
  const client = getPgClient();
  await client.connect();
  const {rows: [{id}]} = await client.query('INSERT INTO items(name) values($1) RETURNING id;', [item.name]);
  await client.end();
  return id;
};

export {insert};
