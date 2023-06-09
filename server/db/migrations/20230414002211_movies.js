exports.up = function (knex) {
  return knex.schema.createTable('movies', (table) => {
    table.increments('id')
    table.string('title')
    table.string('imdb_id')
    table.boolean('watched')
    table.string('img')
    table.timestamp('date_added').defaultTo(Date.now())
    table.string('added_by_user')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('movies')
}
