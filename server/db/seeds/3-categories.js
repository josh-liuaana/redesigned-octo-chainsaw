/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('category').del()
  await knex('category').insert([
    { id: 1, name: 'Action/Adventure' },
    { id: 2, name: 'Sci-Fi' },
    { id: 3, name: 'Drama' },
    { id: 4, name: 'Thriller' },
    { id: 5, name: 'Comedy' },
    { id: 6, name: 'Fantasy' },
    { id: 7, name: 'History' },
    { id: 8, name: 'Western' },
    { id: 9, name: 'Musical' },
  ])
}
