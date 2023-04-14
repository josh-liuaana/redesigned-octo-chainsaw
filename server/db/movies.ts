import connection from "./connection";
import type { Movie } from '../../models/movies'

export function getAllMovies(db = connection): Promise<Movie[]> {
  return db('movies').select('*')
}