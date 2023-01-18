/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('movie').del()
  await knex('movie').insert([
    { id: 1, title: 'Inception', release_year: 2010 },
    { id: 2, title: 'The Social Network', release_year: 2010 },
    { id: 3, title: 'Black Swan', release_year: 2010 },
    { id: 4, title: "The King's Speech", release_year: 2010 },
    { id: 5, title: 'The Help', release_year: 2011 },
    { id: 6, title: 'Bridesmaids', release_year: 2011 },
    {
      id: 7,
      title: 'Harry Potter and the Deathly Hallows: Part 2',
      release_year: 2011,
    },
    { id: 8, title: 'The Avengers', release_year: 2012 },
    { id: 9, title: 'Silver Linings Playbook', release_year: 2012 },
    { id: 10, title: 'Django Unchained', release_year: 2012 },
    { id: 11, title: 'Gravity', release_year: 2013 },
    { id: 12, title: '12 Years a Slave', release_year: 2013 },
    { id: 13, title: 'American Hustle', release_year: 2013 },
    { id: 14, title: 'The Grand Budapest Hotel', release_year: 2014 },
    { id: 15, title: 'Boyhood', release_year: 2014 },
    { id: 16, title: 'Whiplash', release_year: 2014 },
    { id: 17, title: 'Mad Max: Fury Road', release_year: 2015 },
    { id: 18, title: 'The Big Short', release_year: 2015 },
    { id: 19, title: 'The Revenant', release_year: 2015 },
    { id: 20, title: 'Moonlight', release_year: 2016 },
    { id: 21, title: 'La La Land', release_year: 2016 },
    { id: 22, title: 'Get Out', release_year: 2017 },
    {
      id: 23,
      title: 'Three Billboards Outside Ebbing, Missouri',
      release_year: 2017,
    },
    { id: 24, title: 'The Shape of Water', release_year: 2017 },
    { id: 25, title: 'Black Panther', release_year: 2018 },
    { id: 26, title: 'A Star is Born', release_year: 2018 },
    { id: 27, title: 'Parasite', release_year: 2019 },
    { id: 28, title: 'Joker', release_year: 2019 },
  ])
}
