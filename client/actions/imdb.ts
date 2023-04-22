import { ThunkAction } from '../store'
import { ImdbAction } from '../../models/movies'
import { movieInfo, searchImdb } from '../apis/imdb'
import { error } from './movies'

export const IMDB_SEARCH = 'IMDB_SEARCH'
export const IMDB_DETAILS = 'IMDB_DETAILS'

export function imdbSearch(data: object) {
  return {
    type: IMDB_SEARCH,
    payload: data
  }
}

export function imdbDetails(data: object) {
  return {
    type: IMDB_DETAILS,
    payload: data
  }
}

// thunks

export function searchThunk(title: string): ThunkAction {
  return async (dispatch) => {
    try {
      const results = await searchImdb(title)
      dispatch(imdbSearch(results))
    } catch (err) {
      console.error('IMDB Action boo: ', err)
      dispatch(error(String(err)))
    }
  }
}

export function detailsThunk(id: string): ThunkAction {
  return async (dispatch) => {
    try {
      const results = await movieInfo(id)
      dispatch(imdbDetails(results))
    } catch (err) {
      console.error('IMDB Action booboo:', err)
      dispatch(error(String(err)))
    }
  }
}