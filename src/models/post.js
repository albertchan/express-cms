import _toString from 'lodash/toString';
import showdown from 'showdown';
import Bookshelf from './base';

const converter = new showdown.Converter();

export const schema = {
  id: { type: 'increments', nullable: false, primary: true },
  user_id: { type: 'integer', nullable: false, unsigned: true, references: 'users.id' },
  uuid: { type: 'string', maxlength: 36, nullable: false, validations: { isUUID: true }},
  language: { type: 'string', maxlength: 6, nullable: false, defaultTo: 'en-US' },
  status: { type: 'string', maxlength: 150, nullable: false, defaultTo: 'draft' },
  visibility: { type: 'string', maxlength: 150, nullable: false, defaultTo: 'public' },
  slug: { type: 'string', maxlength: 150, nullable: false, unique: true },
  title: { type: 'string', maxlength: 255, nullable: false },
  featured: { type: 'bool', nullable: false, defaultTo: false },
  html: { type: 'text', maxlength: 16777215, nullable: true },
  markdown: { type: 'text', maxlength: 16777215, nullable: true },
  summary: { type: 'string', maxlength: 255, nullable: true },
  published_at: { type: 'dateTime', nullable: true }
}

export class Post extends Bookshelf.Model {
  get tableName() {
    return 'posts';
  }

  get hasTimestamps() {
    return true;
  }

  // Relations
  user() {
    return this.belongsTo('User', 'user_id');
  }

  // Events
  saving(model, attr, options) {
    let markdown;
    let title = 'Untitled';
    let tags = [];

    title = this.get('title') || title;
    this.set('title', _toString(title).trim());

    markdown = _toString(this.get('markdown'));
    this.set('html', converter.makeHtml(markdown));
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
      findOne: ['columns', 'importing', 'withRelated', 'require'],
      findPage: ['page', 'limit', 'columns', 'filter', 'order', 'status', 'staticPages'],
      findAll: ['columns', 'filter']
    };

    if (validOptions[methodName]) {
      options = options.concat(validOptions[methodName]);
    }

    return options;
  }

  /**
   * add
   *
   * @extends Bookshelf.Model.add to handle returning the full object
   * **See:** [Bookshelf.Model.add](base.js.html#add)
   */
  static add(data, options) {
    options = options || {};

    return Bookshelf.Model.add.call(this, data, options).then(post => {
      return post;
    });
  }
}

export const Posts = Bookshelf.Collection.extend({
  model: Post
});

export default Bookshelf.model('Post', Post);
