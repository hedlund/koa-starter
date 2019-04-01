const bcrypt = require('bcryptjs');

exports.seed = (knex, Promise) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync('macuserface', salt);
  return knex('users').del()
    .then(() => knex('users').insert({
      username: 'user',
      hash,
    }));
};
