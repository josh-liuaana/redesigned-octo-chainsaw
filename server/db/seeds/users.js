exports.seed = async function (knex) {
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      name: 'Mooovies Admin',
      email: 'mooovies@josh.com',
      given_name: 'mooovies',
      auth0_id: 'auth0|644de85d62ba788931f2db19',
    },
    {
      id: 2,
      name: "Josh Liua'ana",
      email: 'jfliuaana@gmail.com',
      given_name: 'Josh',
      auth0_id: 'google-oauth2|112967448831376942358',
    },
  ])
}
