// @ts-nocheck
import request from "superagent";
import type {} from '../../models/movies'

const imdbURL = 'https://imdb-api.com/en/API'

export async function searchImdb(movie: string) {
  // const res = await request.get(`${imdbURL}/SearchMovie/${process.env.IMDB_KEY}/${movie}`)
  const res = await request.get(`${imdbURL}/SearchMovie/${import.meta.env.VITE_IMDB_KEY}/${movie}`)
  return res.body.results
}

export async function movieInfo(id: string) {
  // const res = await request.get(`${imdbURL}/Title/${process.env.IMDB_KEY}/${id}`)
  const res = await request.get(`${imdbURL}/Title/${import.meta.env.VITE_IMDB_KEY}/${id}`)
  return res.body
}

export async function getTrailer(id: string) {
  // const res = await request.get(`${imdbURL}/YouTubeTrailer/${process.env.IMDB_KEY}/${id}`)
  const res = await request.get(`${imdbURL}/YouTubeTrailer/${import.meta.env.VITE_IMDB_KEY}/${id}`)
  return res.body
}