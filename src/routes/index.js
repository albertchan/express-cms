import apiRoutes from './api/v1';
import userRoutes from './users';

export default (server) => {

  server.get('/', (req, res) => {
    res.render('index', {
      title: 'Home'
    });
  });

  // users
  userRoutes(server);

  // import API routes
  apiRoutes(server);
}
