import Bookshelf from './base';

export const schema = {
  id: { type: 'increments', nullable: false, primary: true },
  user_id: { type: 'integer', nullable: false, unsigned: true, references: 'users.id' },
  address1: { type: 'string', maxlength: 255 },
  address2: { type: 'string', maxlength: 255 },
  city: { type: 'string', maxlength: 255 },
  state_code: { type: 'string', maxlength: 8 },
  country_code: { type: 'string', maxlength: 8 },
  zip_code: { type: 'string', maxlength: 32 },
  tel_number: { type: 'string', maxlength: 32 }
};

export const Profile = Bookshelf.Model.extend({
  tableName: 'profiles',

  user() {
    return this.belongsTo('User');
  }
}, {
  /**
   * permittedOptions
   *
   * Returns an array of keys permitted in a method's `options` hash, depending
   * on the current method.
   *
   * @param {String} methodName Name of the method to check valid options for
   * @return {Array} Keys allowed in the `options` hash of the model's method
   */
  permittedOptions(methodName) {
    let options = Bookshelf.Model.permittedOptions();
    const validOptions = {
      findOne: ['withRelated'],
      findAll: ['withRelated']
    };

    if (validOptions[methodName]) {
      options = options.concat(validOptions[methodName]);
    }

    return options;
  }
});
