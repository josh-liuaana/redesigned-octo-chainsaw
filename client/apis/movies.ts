import request from "superagent";
import type { Movie } from '../../models/movies'

const movieUrl = '/api/v1/movies'

export async function fetchMovies() {
  const res = await request.get(movieUrl)
  const movieArray = res.body
  return movieArray
}

export async function removeMovie(id: number) {
  await request.delete(`${movieUrl}/${id}`)
}
