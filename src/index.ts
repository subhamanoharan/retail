import * as config from 'config';
const https = require('https');
var fs = require('fs');

import app from './app';

app.listen(config.PORT, () => console.log('App listening on port-', config.PORT))

if(process.env.NODE_ENV == 'production') {
  console.log("Setting up HTTPS")
  var options = {
      key: fs.readFileSync('/etc/letsencrypt/live/msg-billing.in/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/msg-billing.in/fullchain.pem'),
      ca: fs.readFileSync('/etc/letsencrypt/live/msg-billing.in/chain.pem')
  };
  const httpsServer = https.createServer(options, app)
  httpsServer.listen(config.HTTPS_PORT, () => console.log('App listening on port-443'))
}
