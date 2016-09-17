import Bookshelf from './base';

export const schema = {
  id: { type: 'increments', nullable: false, primary: true },
  user_id: { type: 'integer', nullable: false, unsigned: true, references: 'users.id' },
  uuid: { type: 'string', maxlength: 36, nullable: false, validations: { isUUID: true }},
  slug: { type: 'string', maxlength: 150, nullable: false, unique: true },
  status: { type: 'string', maxlength: 150, nullable: false, defaultTo: 'draft' },
  title: { type: 'string', maxlength: 255, nullable: false, unique: true },
  featured: { type: 'bool', nullable: false, defaultTo: false },
  language: { type: 'string', maxlength: 6, nullable: false, defaultTo: 'en-US' },
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
}
