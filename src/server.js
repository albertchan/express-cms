import bookshelf from 'bookshelf';
import compression from 'compression';
import config from './config/server.config';
import cors from 'cors';
import Express from 'express';
import knex from 'knex';
import models from './models';
import path from 'path';
import routes from './routes';

// ------------------------------------
// Initializations
// ------------------------------------
const server = new Express();
const db = knex({
  client: config.dbClient,
  connection: config.connection
});

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
