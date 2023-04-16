import connection from "./connection";
import type { Movie } from '../../models/movies'

export function getAllMovies(db = connection): Promise<Movie[]> {
  return db('movies').select('*')
}

export function delMovie(id: number, db = connection): Promise<number> {
  return db('movies').delete().where({ id })
}