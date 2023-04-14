import { Action, Movie } from "../../models/movies";
import { fetchMovies } from "../apis/movies";
import { ThunkAction } from "../store";

export const SET_MOVIES = 'SET_MOVIES'
export const ERROR = 'ERROR'

// simps

export function setMovies(movies: Movie[]): Action {
  return {
    type: SET_MOVIES,
    payload: movies
  }
}

export function error(message: string): Action {
  return {
    type: ERROR,
    payload: message
  }
}

// thunccs

export function getMovies(): ThunkAction {
  return (dispatch) => {
    return fetchMovies()
      .then(movies => {
        dispatch(setMovies(movies))
      })
      .catch(err => {
        console.log(err.message)
        dispatch(error(err.message))
      })
  }
}