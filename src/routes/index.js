import apiRoutes from './api/v1';
import authRoutes from './auth';
import postRoutes from './posts';
import userRoutes from './users';

export default (server) => {

  server.get('/', (req, res) => {
    res.render('index', {
      title: 'Home'
    });
  });

  // posts
  authRoutes(server);

  // posts
  postRoutes(server);

  // users
  userRoutes(server);

  // import API routes
  apiRoutes(server);
}
