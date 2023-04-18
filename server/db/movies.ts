import connection from "./connection";
import type { Movie, MovieData } from '../../models/movies'

export function getAllMovies(db = connection): Promise<Movie[]> {
  return db('movies').select('*')
}

export function delMovie(id: number, db = connection): Promise<number> {
  return db('movies').delete().where({ id })
}

export function insertMovie(movie: MovieData, db = connection): Promise<Movie[]> {
  return db('movies').insert(movie).returning(['id', 'title', 'imdb_id', 'watched', 'img'])
}