exports.seed = async function (knex) {
  await knex('movies').del()
  await knex('movies').insert([
    {
      id: 1,
      title: 'Big Hero 6',
      imdb_id: 'tt2245084',
      watched: false,
      img: 'https://m.media-amazon.com/images/M/MV5BMDliOTIzNmUtOTllOC00NDU3LWFiNjYtMGM0NDc1YTMxNjYxXkEyXkFqcGdeQXVyNTM3NzExMDQ@._V1_Ratio0.7027_AL_.jpg',
      date_added: 1682205263111,
      added_by_user: 'google-oauth2|112967448831376942358',
    },
    {
      id: 2,
      title: 'Luca',
      imdb_id: 'tt12801262',
      watched: false,
      img: 'https://m.media-amazon.com/images/M/MV5BZTQyNTU0MDktYTFkYi00ZjNhLWE2ODctMzBkM2U1ZTk3YTMzXkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_Ratio0.6757_AL_.jpg',
      date_added: 1682205263113,
      added_by_user: 'google-oauth2|112967448831376942358',
    },
    {
      id: 3,
      title: 'Inside Out',
      imdb_id: 'tt2096673',
      watched: false,
      img: 'https://m.media-amazon.com/images/M/MV5BOTgxMDQwMDk0OF5BMl5BanBnXkFtZTgwNjU5OTg2NDE@._V1_Ratio0.6757_AL_.jpg',
      date_added: 1682205263115,
      added_by_user: 'auth0|644de85d62ba788931f2db19',
    },
    {
      id: 4,
      title: 'Onward',
      imdb_id: 'tt7146812',
      watched: false,
      img: 'https://m.media-amazon.com/images/M/MV5BMTZlYzk3NzQtMmViYS00YWZmLTk5ZTEtNWE0NGVjM2MzYWU1XkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_Ratio0.6757_AL_.jpg',
      date_added: 1682205263121,
      added_by_user: 'auth0|644de85d62ba788931f2db19',
    },
    {
      id: 5,
      title: 'Raya and the Last Dragon',
      imdb_id: 'tt5109280',
      watched: false,
      img: 'https://m.media-amazon.com/images/M/MV5BZWNiOTc4NGItNGY4YS00ZGNkLThkOWEtMDE2ODcxODEwNjkwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_Ratio0.6757_AL_.jpg',
      date_added: 1682205263129,
      added_by_user: 'google-oauth2|112967448831376942358',
    },
  ])
}
