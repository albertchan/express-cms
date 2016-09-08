/*
 * Express configuration
 */

const projectRoot = process.cwd();
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  // let config = new Map();
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,

  // The path at which static assets are served from. If omitted, Express will
  // serve any static assets from your project root 'static' directory.
  //
  // Expects: String
  staticPath: projectRoot + '/public',

  // Compression
  gzipEnabled: true,
  gzipThreshold: 200,

  // Database connection
  dbClient: 'pg',
  connection: {
    host: 'localhost',
    user: 'express',
    password: 'verysecret',
    database: 'express_cms_dev',
    charset: 'utf-8'
  }
};
