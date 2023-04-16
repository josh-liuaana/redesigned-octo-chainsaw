import request from "superagent";
import type {} from '../../models/movies'

const imdbURL = 'https://imdb-api.com/en/API/SearchMovie/'

export async function searchImdb(movie: string) {
  const res = await request.get(`${imdbURL}${process.env.IMDB_KEY}/${movie}`)
  const imdbMovieArray = res.body.results
  return imdbMovieArray
}