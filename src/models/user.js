import Bookshelf from './base';
import uuid from 'node-uuid';

export const schema = {
  id: { type: 'increments', nullable: false, primary: true },
  uuid: { type: 'string', maxlength: 36, nullable: false, validations: { isUUID: true }},
  email: { type: 'string', maxlength: 255, nullable: false, unique: true, validations: { isEmail: true }},
  name: { type: 'string', maxlength: 255, nullable: false },
  password: { type: 'string', maxlength: 255, nullable: false },
  timestamps: { type: 'timestamps' }
};

export const User = Bookshelf.Model.extend({
  tableName: 'users',

  role() {
    return this.hasOne('Role');
  }
}, {
  /**
   * add
   *
   * Naively adds a user. Hashes the password provided before saving to the
   * database.
   *
   * @param {object} data
   * @param {object} options
   */
  add(data, options) {
    const userData = {
      uuid: uuid.v4(),
      email: data.email,
      name: data.name,
      password: data.password
    };

    console.log(userData);

    User.forge(userData).save().then(addedUser => {
      return addedUser;
    });
  },

  /**
   * check
   *
   * Finds the user by email and checks the password.
   *
   * @param {object} object
   */
  check(data) {

  },

  /**
   * edit
   *
   * Edits the user object.
   *
   * @param {object} data
   * @param {object} options
   */
  edit(data, options) {

  },

  /**
   * changePassword
   *
   * Finds the user by id and changes the user's password.
   *
   * @param {object} data
   * @param {object} options
   */
  changePassword(data, options) {

  },

  resetPassword(options) {

  },

  generateResetToken(email, expires, hash) {

  },

  validateToken(token, hash) {

  },

  // Fetch a user by email
  getByEmail(email, options) {
    options = options || {};
    options.require = true;

    return User.forge({email: email.toLowerCase()}).fetch(options).then(user => {
      return user;
    })
    .catch(err => {
      console.log('User not found.');
      return
    });
  }
});

export const Users = Bookshelf.Collection.extend({
  model: User
});
