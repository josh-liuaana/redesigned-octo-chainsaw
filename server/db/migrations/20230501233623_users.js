exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('name')
    table.string('email')
    table.string('given_name')
    table.string('auth0_id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
