exports.seed = async function (knex) {
  await knex('movies').del()
  await knex('movies').insert([
    {
      id: 1,
      title: 'Big Hero 6',
      imdb_id: 'tt2245084',
      watched: false,
      img: 'https://m.media-amazon.com/images/M/MV5BMDliOTIzNmUtOTllOC00NDU3LWFiNjYtMGM0NDc1YTMxNjYxXkEyXkFqcGdeQXVyNTM3NzExMDQ@._V1_Ratio0.7027_AL_.jpg',
    },
    {
      id: 2,
      title: 'Luca',
      imdb_id: 'tt12801262',
      watched: false,
      img: 'https://m.media-amazon.com/images/M/MV5BZTQyNTU0MDktYTFkYi00ZjNhLWE2ODctMzBkM2U1ZTk3YTMzXkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_Ratio0.6757_AL_.jpg',
    },
    {
      id: 3,
      title: 'Inside Out',
      imdb_id: 'tt2096673',
      watched: false,
      img: 'https://m.media-amazon.com/images/M/MV5BOTgxMDQwMDk0OF5BMl5BanBnXkFtZTgwNjU5OTg2NDE@._V1_Ratio0.6757_AL_.jpg',
    },
    {
      id: 4,
      title: 'Onward',
      imdb_id: 'tt7146812',
      watched: false,
      img: 'https://m.media-amazon.com/images/M/MV5BMTZlYzk3NzQtMmViYS00YWZmLTk5ZTEtNWE0NGVjM2MzYWU1XkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_Ratio0.6757_AL_.jpg',
    },
    {
      id: 5,
      title: 'Raya and the Last Dragon',
      imdb_id: 'tt5109280',
      watched: false,
      img: 'https://m.media-amazon.com/images/M/MV5BZWNiOTc4NGItNGY4YS00ZGNkLThkOWEtMDE2ODcxODEwNjkwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_Ratio0.6757_AL_.jpg',
    },
  ])
}
