import connection from "./connection";
import type { Movie, MovieData, User, UserData } from '../../models/movies'

export function getAllMovies(db = connection): Promise<Movie[]> {
  return db('movies').select('*')
}

export function delMovie(id: number, db = connection): Promise<number> {
  return db('movies').delete().where({ id })
}

export function insertMovie(movie: MovieData, db = connection): Promise<Movie[]> {
  return db('movies').insert({...movie, date_added: Date.now()}).returning(['id', 'title', 'imdb_id', 'watched', 'img', 'date_added', 'added_by_user'])
}

export function updateMovie(id: number, seen: boolean, db = connection): Promise<void> {
  return db('movies').where({ id }).update({ watched: seen})
}

export function usersMovies(db = connection) {
  return db('movies').join('users', 'users.auth0_id', 'added_by_user').select(
    'movies.id AS id', 'title', 'imdb_id', 'watched', 'img', 'date_added', 'given_name', 'auth0_id'
  )
}

export function singleUserMovies(id: number, db = connection) {
  return db('movies').join('users', 'users.auth0_id', 'added_by_user').where('users.id', id).select('movies.id AS id', 'title', 'imdb_id', 'watched', 'img', 'date_added', 'given_name', 'auth0_id')
}

export function getAllUsers(db = connection): Promise<User[]> {
  return db('users').select('*')
}

export function addUser(user: UserData, db = connection): Promise<User[]> {
  return db('users').insert(user).returning(['id', 'name', 'email', 'given_name', 'auth0_id'])
}

export function deleteUser(id: number, db = connection): Promise<number> {
  return db('users').delete().where({ id })
}