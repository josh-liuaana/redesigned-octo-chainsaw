import request from "superagent";
import type {} from '../../models/movies'

const imdbURL = 'https://imdb-api.com/en/API'

export async function searchImdb(movie: string) {
  const res = await request.get(`${imdbURL}/SearchMovie/${process.env.IMDB_KEY}/${movie}`)
  const imdbMovieArray = res.body.results
  return imdbMovieArray
}

export async function movieInfo(id: string) {
  const res = await request.get(`${imdbURL}/Title/${process.env.IMDB_KEY}/${id}`)
  const imdbMovieInfo = res.body
  return imdbMovieInfo
}