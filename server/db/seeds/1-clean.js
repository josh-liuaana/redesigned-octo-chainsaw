/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('movie_category').del()
  await knex('movie').del()
  await knex('category').del()
}
