export const schema = {
  id: { type: 'increments', nullable: false, primary: true },
  version: { type: 'bigInteger', nullable: false, unique: true },
  created_at: { type: 'dateTime', nullable: false }
};
