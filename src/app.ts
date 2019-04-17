import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as sessionMiddleware from 'express-session';
import * as memorystore from 'memorystore';
import * as config from 'config';

import ApiRouter from './routes/apiRoutes';
import errorHandler from './services/errorHandler';
import cors from './middlewares/cors';

const app = express()
const MemoryStore = memorystore(sessionMiddleware);

app.use(bodyParser.json());
app.use(cors);
app.use(sessionMiddleware({ secret: config.SESSION_SECRET,
  resave: true, saveUninitialized: false,
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  cookie: {httpOnly: true, maxAge: 86400000} }));

app.use(express.static(path.join(__dirname, '/../retail-frontend/dist')));
app.use(express.static(path.join(__dirname, '/../retail-frontend/public')));

app.use('/api', ApiRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../retail-frontend/public/index.html'));
});

app.use(errorHandler);

export default app;
