import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import Express from 'express';
import hbs from 'hbs';
import path from 'path';
import Promise from 'bluebird';
import { getDatabaseVersion, populate } from './lib/migrations';
import config from './config/server.config';
import routes from './routes';

// ------------------------------------
// Initializations
// ------------------------------------
getDatabaseVersion()
  .then(currentVersion => {
    // console.log('currentVersion');
  })
  .catch(err => {
    if (err) {
      return populate();
    }

    return err;
  });
const server = new Express();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// ------------------------------------
// Server configuration
// ------------------------------------

// use Handlebars as the default view engine
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'hbs');

// parse application/x-www-form-urlencoded
server.use(urlencodedParser);

server.use(compression({
  threshold: config.gzipThreshold
}));

// ------------------------------------
// View helpers
// ------------------------------------
let blocks = {};
hbs.registerHelper('extend', (name, context) => {
  let block = blocks[name];
  if (!block) {
    block = blocks[name] = [];
  }

  block.push(context.fn(this));
});

hbs.registerHelper('block', name => {
  let val = (blocks[name] || []).join('\n');

  // clear the block
  blocks[name] = [];
  return val;
});

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
