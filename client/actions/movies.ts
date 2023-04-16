import { Action, Movie } from "../../models/movies";
import { fetchMovies, removeMovie } from "../apis/movies";
import { ThunkAction } from "../store";

export const SET_MOVIES = 'SET_MOVIES'
export const DEL_MOVIE = 'DEL_MOVIE'
export const ERROR = 'ERROR'

// simps

export function setMovies(movies: Movie[]): Action {
  return {
    type: SET_MOVIES,
    payload: movies
  }
}

export function deleteMovie(id: number): Action {
  return {
    type: DEL_MOVIE,
    payload: id
  }
}

export function error(message: string): Action {
  return {
    type: ERROR,
    payload: message
  }
}

// thunccs

export function getMovies(): ThunkAction{
  return async (dispatch) => {
    try {
      const moviesArray = await fetchMovies()
      dispatch(setMovies(moviesArray))
    } catch (err) {
      console.error('Action booboo: ', err)
      dispatch(error(String(err)))
    }
  }
}

export function deleteMovieThunk(id: number): ThunkAction {
  return async (dispatch) => {
    try {
      await removeMovie(id)
      dispatch(deleteMovie(id))
    } catch (err) {
      console.error('Action booboo: ', err)
      dispatch(error(String(err)))
    }
  }
}