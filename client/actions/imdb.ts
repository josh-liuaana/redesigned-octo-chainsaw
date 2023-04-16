import { Action } from '../../models/movies'

export const IMDB_SEARCH = 'IMDB_SEARCH'

export function imdbSearch(data: object) {
  return {
    type: IMDB_SEARCH,
    payload: data
  }
}