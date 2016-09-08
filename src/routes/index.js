import apiRoutes from './api/v1';

export default (server) => {

  server.get('/', (req, res) => {
    res.render('index', {
      title: 'Home'
    });
  });

  // import API routes
  apiRoutes(server);
}
