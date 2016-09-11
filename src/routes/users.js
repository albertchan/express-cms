import {
  index,
  create,
  show,
  update
} from '../controllers/user_controller';

// ------------------------------------
// Users
// ------------------------------------
export default (server) => {
  server.get('/users', index);

  server.get('/users/new', create);

  server.get('/users/:id', show);

  server.get('/users/:id/edit', update);
}
