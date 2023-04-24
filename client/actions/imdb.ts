import { ThunkAction } from '../store'
import { ImdbAction } from '../../models/movies'
import { getTrailer, movieInfo, searchImdb } from '../apis/imdb'

export const IMDB_SEARCH = 'IMDB_SEARCH'
export const IMDB_DETAILS = 'IMDB_DETAILS'
export const IMDB_TRAILER = 'IMDB_TRAILER'
export const ERROR = 'ERROR'


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

export function imdbTrailer(data: object) {  
  return {
    type: IMDB_TRAILER,
    payload: data
  }
}

export function error(message: string) {
  return {
    type: ERROR,
    payload: message
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

export function trailerThunk(id: string): ThunkAction {
  return async (dispatch) => {
    try {
      const result = await getTrailer(id)      
      dispatch(imdbTrailer(result))
    } catch (err) {
      console.error('IMDBTrailer Action booboo: ', err)
      dispatch(error(String(err)))
    }
  }
}