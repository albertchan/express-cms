import { schema as users } from './user';
import { schema as profiles } from './profile';
import { schema as schema_migrations } from './base/schema_migration';

// Expose all models
export { User } from './user';
export { Profile } from './profile';

export const schema = {
  users: users,
  profiles: profiles,
  schema_migrations: schema_migrations
};
