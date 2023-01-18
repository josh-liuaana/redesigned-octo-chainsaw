/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.createTable('movie', (t) => {
    t.integer('id').primary() // https://www.sqlite.org/autoinc.html
    t.string('title').notNullable()
    t.integer('release_year').notNullable()
  })

  await knex.schema.createTable('category', (t) => {
    t.integer('id').primary()
    t.string('name').notNullable()
  })

  await knex.schema.createTable('movie_category', (t) => {
    t.integer('movie_id')
    t.integer('category_id')
    t.primary(['movie_id', 'category_id'])

    t.foreign('movie_id').references('id').inTable('movie')
    t.foreign('category_id').references('id').inTable('category')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.dropTable('movie_category')
  await knex.schema.dropTable('movie')
  await knex.schema.dropTable('category')
}
