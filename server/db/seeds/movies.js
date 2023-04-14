exports.seed = async function (knex) {
  await knex('movies').del()
  await knex('movies').insert([
    {
      id: 1,
      title: 'The Batman',
      imdb_id: 'tt1877830',
      watched: false,
      img: 'https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_Ratio0.6757_AL_.jpg',
    },
    {
      id: 2,
      title: 'Arrival',
      imdb_id: 'tt2543164',
      watched: false,
      img: 'https://m.media-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI4MzAy._V1_Ratio0.6757_AL_.jpg',
    },
  ])
}
