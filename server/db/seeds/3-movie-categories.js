/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('movie_category').del()
  await knex('movie_category').insert([
    { movie_id: 1, category_id: 1 },
    { movie_id: 1, category_id: 2 },
    { movie_id: 2, category_id: 3 },
    { movie_id: 3, category_id: 3 },
    { movie_id: 3, category_id: 4 },
    { movie_id: 4, category_id: 3 },
    { movie_id: 5, category_id: 3 },
    { movie_id: 6, category_id: 2 },
    { movie_id: 6, category_id: 5 },
    { movie_id: 7, category_id: 2 },
    { movie_id: 7, category_id: 5 },
    { movie_id: 8, category_id: 1 },
    { movie_id: 8, category_id: 2 },
    { movie_id: 9, category_id: 3 },
    { movie_id: 10, category_id: 3 },
    { movie_id: 10, category_id: 6 },
    { movie_id: 11, category_id: 2 },
    { movie_id: 11, category_id: 4 },
    { movie_id: 12, category_id: 3 },
    { movie_id: 13, category_id: 2 },
    { movie_id: 13, category_id: 7 },
    { movie_id: 14, category_id: 3 },
    { movie_id: 15, category_id: 3 },
    { movie_id: 16, category_id: 3 },
    { movie_id: 16, category_id: 8 },
    { movie_id: 17, category_id: 1 },
    { movie_id: 17, category_id: 2 },
    { movie_id: 18, category_id: 3 },
    { movie_id: 19, category_id: 3 },
    { movie_id: 20, category_id: 3 },
    { movie_id: 21, category_id: 2 },
    { movie_id: 21, category_id: 9 },
  ])
}
