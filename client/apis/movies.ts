import request from "superagent";
import type { MovieData } from '../../models/movies'

const movieUrl = '/api/v1/movies'

export async function fetchMovies() {
  const res = await request.get(movieUrl)
  const movieArray = res.body
  return movieArray
}

export async function removeMovie(id: number) {
  await request.delete(`${movieUrl}/${id}`)
}

export async function postMovie(movie: MovieData, token: string) {
  const res = await request.post(movieUrl).set('Authorization', `Bearer ${token}`).send(movie)
  const movieFromDb = res.body
  return movieFromDb
}

export async function patchMovie(id: number, seen: boolean) {
  await request.patch(`${movieUrl}/${id}`).send({seen})
}
