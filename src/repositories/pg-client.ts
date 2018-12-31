import { Client }  from 'pg';

const getPgClient = () => new Client({
  host: 'localhost', port: 5432, database: 'retail',
  user: 'postgres', password: 'postgres'});

const query = async (query: String, values?): Promise<any> => {
  const client = getPgClient();
  await client.connect();
  const result = await client.query(query, values);
  await client.end();
  return result;
};

export {query};
