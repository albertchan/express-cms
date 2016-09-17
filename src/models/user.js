import Bookshelf from './base';
import { Profile } from './profile';
import uuid from 'node-uuid';

export const schema = {
  id: { type: 'increments', nullable: false, primary: true },
  uuid: { type: 'string', maxlength: 36, nullable: false, validations: { isUUID: true }},
  email: { type: 'string', maxlength: 255, nullable: false, unique: true, validations: { isEmail: true }},
  name: { type: 'string', maxlength: 255, nullable: false },
  password: { type: 'string', maxlength: 255, nullable: false },
  timestamps: { type: 'timestamps' }
};

export class User extends Bookshelf.Model {
  get tableName() {
    return 'users';
  }

  get hasTimestamps() {
    return true;
  }

  profile() {
    return this.hasOne('Profile');
  }

  /**
   * permittedOptions
   *
   * Returns an array of keys permitted in a method's `options` hash, depending
   * on the current method.
   *
   * @param {String} methodName Name of the method to check valid options for
   * @return {Array} Keys allowed in the `options` hash of the model's method
   */
  static permittedOptions(methodName) {
    let options = Bookshelf.Model.permittedOptions();
    const validOptions = {
      findOne: ['withRelated', 'status'],
      setup: ['id'],
      edit: ['withRelated', 'id'],
      findPage: ['page', 'limit', 'columns', 'filter', 'order', 'status'],
      findAll: ['filter']
    };

    if (validOptions[methodName]) {
      // return validOptions[methodName];
      options = options.concat(validOptions[methodName]);
    }

    return options;
  }

  /**
   * findOne
   *
   * @extends Bookshelf.Model.findOne to include roles
   */
  static findOne(data, options) {

  }

  /**
   * add
   *
   * Naively adds a user. Hashes the password provided before saving to the
   * database.
   *
   * @param {object} data
   * @param {object} options
   */
  static add(data, options) {
    const userData = {
      uuid: uuid.v4(),
      email: data.email,
      name: data.name,
      password: data.password
    };

    Bookshelf.transaction(t => {
      return User.forge()
        .save(userData, {transacting: t})
        .then(addedUser => {
          // TODO: Need to wait for Bookshelf to get relations right and refactor
          // this ugly manual crap
          return Profile.forge().save({user_id: addedUser.id}, {transacting: t});
        })
        .then(addedProfile => {
          t.commit;
          return addedProfile;
        })
        .catch(error => {
          t.rollback;
          console.error('error --->', error);
        });
    }).then(model => {
      // ok
    }).catch(error => {
      console.error(error);
    });
  }

  /**
   * check
   *
   * Finds the user by email and checks the password.
   *
   * @param {object} object
   */
  static check(data) {

  }

  /**
   * edit
   *
   * Edits the user object.
   *
   * @param {object} data
   * @param {object} options
   */
  static edit(data, options) {

  }

  /**
   * changePassword
   *
   * Finds the user by id and changes the user's password.
   *
   * @param {object} data
   * @param {object} options
   */
  static changePassword(data, options) {

  }

  static resetPassword(options) {

  }

  static generateResetToken(email, expires, hash) {

  }

  static validateToken(token, hash) {

  }

  /**
   * getByEmail
   *
   * Finds an user by email.
   *
   * @param {string} email
   * @param {object} options
   * @return {object} model
   */
  static getByEmail(email, options) {
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
}

export const Users = Bookshelf.Collection.extend({
  model: User
});

export default Bookshelf.model('User', User);
