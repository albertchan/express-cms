import Vue from 'vue';
import { createRenderer } from 'vue-server-renderer';
import { User } from '../models/user';
import { Profile } from '../models/profile';
import { usersTable } from '../components/users_table';

export function index(req, res) {
  User.findPage().then(result => {
    const renderer = createRenderer();
    const vm = usersTable;
    vm.items = result.users;

    renderer.renderToString(vm, (err, html) => {
      res.render('user/index', {
        title: 'Users',
        usersTable: html
      });
    })
  });
}

export function add(req, res) {
  res.render('user/new', {
    title: 'Users'
  });
}

export function create(req, res, next) {
  if (!req.body) return res.status(400);

  const data = req.body;
  User.add(data);
  res.status(200).send(data);
}

export function read(req, res) {
  res.render('user/show', {
    title: 'Users'
  });
}

export function update(req, res) {
  res.render('user/edit', {
    title: 'Users'
  });
}

/**
 * doQuery
 * Makes the call to the Model layer
 *
 * @param {Object} options
 * @returns {Object} options
 */
function doQuery(options) {
  const newUser = options;

  if (newUser.email) {

  } else {
    return Promise.reject(new Error('An email must be provided.'));
  }

  User.getByEmail(newUser.email).then(foundUser => {
    if (!foundUser) {
      return User.add(newUser, options);
    } else {
      return Promise.reject(new Error('User with that email already exists.'));
    }
  });
}
