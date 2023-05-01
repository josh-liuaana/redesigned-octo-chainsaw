import request from "superagent";
import type {} from '../../models/movies'

const imdbURL = 'https://imdb-api.com/en/API'
const url = '/api/v1/imdb'

export async function searchImdb(movie: string) {
  const res = await request.get(`${url}/search/${movie}`)
  return res.body
}

export async function movieInfo(id: string) {
  const res = await request.get(`${url}/info/${id}`)
  return res.body
}

export async function getTrailer(id: string) {
  const res = await request.get(`${url}/trailer/${id}`)
  return res.body
}