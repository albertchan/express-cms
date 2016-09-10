import compression from 'compression';
import cors from 'cors';
import Express from 'express';
import path from 'path';
import Promise from 'bluebird';
import { getDatabaseVersion, populate } from './lib/migrations';
import config from './config/server.config';
import models from './models';
import routes from './routes';

// ------------------------------------
// Initializations
// ------------------------------------
getDatabaseVersion()
  .then(currentVersion => {
    console.log('currentVersion');
  })
  .catch(err => {
    if (err) {
      // return populate();
    }

    return err;
  });
const server = new Express();

// ------------------------------------
// Server configuration
// ------------------------------------
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'hbs');
server.use(compression({
  threshold: config.gzipThreshold
}));

// ------------------------------------
// Routes definitions
// ------------------------------------
routes(server);

// ------------------------------------
// To serve and listen
// ------------------------------------
server.listen(config.port);
console.log(`Express server started on port ${config.port}`);

export default server;
