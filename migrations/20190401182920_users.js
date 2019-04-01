
exports.up = (knex, Promise) => 
  knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('username').unique().notNullable();
    table.string('hash').notNullable();
  });

exports.down = (knex, Promise) =>
  knex.schema.dropTable('users');
