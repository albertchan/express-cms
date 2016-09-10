import Bookshelf from './base';

export const schema = {
  id: { type: 'increments', nullable: false, primary: true },
  uuid: { type: 'string', maxlength: 32, nullable: false, validations: { isUUID: true }},
  name: { type: 'string', maxlength: 255, nullable: false },
  email: { type: 'string', maxlength: 255, nullable: false, unique: true, validations: { isEmail: true }},
  password: { type: 'string', maxlength: 255, nullable: false },
  timestamps: { type: 'timestamps' }
};

export const User = Bookshelf.Model.extend({
  tableName: 'users',

  role() {
    return this.hasOne('Role');
  }
});
