exports.up = function (knex) {
  return knex.schema.createTable('movies', (table) => {
    table.increments('id')
    table.string('title')
    table.string('imdb_id')
    table.boolean('watched')
    table.string('img')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('movies')
}
