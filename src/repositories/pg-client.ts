import { Client }  from 'pg';
import * as mysql from 'mysql'
import * as config from 'config';
import * as _ from 'lodash'
console.log('DB CONFIG', config)
// const getPgClient = () => new Client(config.DATABASE);
//
// const query = async (query: String, values?): Promise<any> => {
//   const client = getPgClient();
//   console.log('Trying to connect')
//   await client.connect()
//     .catch(error => {
//       console.log('Error while connect')
//       console.log(error)
//       throw error
//     });
//   console.log('Connected successfully')
//   const result = await client.query(query, values).catch(async (error) => {
//     await client.end();
//     console.log('Db error occured', error.message)
//     return Promise.reject(error);
//   });
//   await client.end();
//   return result;
// };

const getMysqlConn = () => mysql.createConnection({
  host: '103.93.16.46',
  user: 'msgbilli_admin',
  password: 'Subha@54321',
  database: 'msgbilli_retail',
  ssl: { rejectUnauthorized: false }
})

const  promisify = (cb) => new Promise(function(resolve, reject) {
        cb(resolve, reject)
    })

const query = async (query, values?): Promise<any> => {
  console.log('Trying to MYSQL connect')
  const conn = getMysqlConn()
  console.log('Connected successfully')
  const preparedQuery = (values ? values.reduce(
      (acc, v, i) => acc.replace(`$${i+1}`, _.isString(v) ? `'${v}'` : v || 'NULL'), `${query}`)
      : query
    ).replace('RETURNING id', '')
  const result = await new Promise(function (resolve, reject){
    conn.query(preparedQuery, function(err, results, fields) {
      console.log(results.insertId)
      if(err) {
        reject(err)
      } else {
        resolve(results.insertId ? [{id: results.insertId}] : results)
      }
    })
  }).catch(async (error) => {
    conn.end();
    console.log('Db error occured', error.message)
    console.log(preparedQuery)
    return Promise.reject(error);
  });
  conn.end();
  return {rows: result};
};

export {query};
