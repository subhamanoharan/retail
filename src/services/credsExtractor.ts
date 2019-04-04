export default (headers) => {
    if (!headers.authorization || headers.authorization.indexOf('Basic ') === -1) {
      return {};
    }
    const base64Credentials =  headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [name, password] = credentials.split(':');
    return {name, password};
}
