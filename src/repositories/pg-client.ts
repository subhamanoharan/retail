import { Client }  from 'pg';
import * as config from 'config';

const getPgClient = () => new Client(config.DATABASE);

const query = async (query: String, values?): Promise<any> => {
  const client = getPgClient();
  await client.connect();
  const result = await client.query(query, values).catch(async (error) => {
    await client.end();
    console.log('Db error occured', error.message)
    return Promise.reject(error);
  });
  await client.end();
  return result;
};

export {query};
