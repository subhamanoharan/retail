import * as config from 'config';

import app from './app';

app.listen(config.PORT, () => console.log('App listening on port-', config.PORT))
