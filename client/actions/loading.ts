import { LoadingAction } from '../../models/movies'

export const REQUEST_MOVIES = 'REQUEST_MOVIES'
export const RECEIVE_MOVIES = 'RECEIVE_MOVIES'

export function requestMovies(): LoadingAction {
  return {
    type: REQUEST_MOVIES,
    payload: null
  }
}

export function receiveMovies(): LoadingAction {
  return {
    type: RECEIVE_MOVIES,
    payload: null
  }
}