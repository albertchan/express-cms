import Vue from 'vue';
import validator from 'validator';
import { createRenderer } from 'vue-server-renderer';
import { User } from '../models/user';
import { Profile } from '../models/profile';
// import profiles from '../models/profile';
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
    title: 'Create a new user'
  });
}

export function create(req, res, next) {
  if (!req.body) return res.status(400);

  const data = req.body;
  User.add(data).then(result => {
    if (result.user_id) {
      res.redirect('/users');
    }
  });
}

export function read(req, res) {
  let data;
  const id = req.params.id;

  if (isNaN(id)) {
    data = {username: id};
  } else {
    data = {id: validator.toInt(id)};
  }

  User.findOne(data).then(user => {
    const userData = user.toJSON();
    delete userData.password;

    res.render('user/show', {
      title: 'User profile',
      user: userData
    });
  }).catch(err => {
    console.error(err);
    res.status(404).render('error');
  });
}

export function update(req, res) {
  res.render('user/edit', {
    title: 'Edit user'
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
