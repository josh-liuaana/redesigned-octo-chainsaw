import request from "superagent";
import type { Movie } from '../../models/movies'

const movieUrl = '/api/v1/movies'

export function fetchMovies() {
  return request
    .get(movieUrl)
    .then(res => res.body)
}