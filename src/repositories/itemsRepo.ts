import getPgClient from './pg-client';

export default class ItemsRepo {
  static async insert(item) {
    const client = getPgClient();
    await client.connect();
    const id = await client.query('INSERT INTO items(name) values($1) RETURNING id;', [item.name]);
    await client.end();
    return id;
  }
}
