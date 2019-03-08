import * as config from 'config';

export default (req, res, next) => {
  res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.set("Access-Control-Allow-Origin", config.FRONTEND_URL);
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.set('Access-Control-Allow-Credentials', true);
  if(req.method === 'OPTIONS')
    res.send();
  else
    next();
}
