import { Action, Movie, MovieData } from "../../models/movies";
import { fetchMovies, removeMovie, postOneMovie, patchMovie } from "../apis/movies";
import { ThunkAction } from "../store";

export const SET_MOVIES = 'SET_MOVIES'
export const ALPHA_SORT = 'ALPHA_SORT'
export const DATE_SORT = 'DATE_SORT'
export const DEL_MOVIE = 'DEL_MOVIE'
export const ADD_MOVIE = 'ADD_MOVIE'
export const UPDATE_MOVIE = 'UPDATE_MOVIE'
export const ERROR = 'ERROR'

// simps

export function setMovies(movies: Movie[]): Action {
  return {
    type: SET_MOVIES,
    payload: movies
  }
}

export function alphaSort(): Action {
  return {
    type: ALPHA_SORT,
    payload: null
  }
}

export function dateSort(): Action {
  return {
    type: DATE_SORT,
    payload: null
  }
}

export function deleteMovie(id: number): Action {
  return {
    type: DEL_MOVIE,
    payload: id
  }
}

export function saveMovie(movie: Movie): Action {
  return {
    type: ADD_MOVIE,
    payload: movie
  }
}

export function updateMovie(id: number, seen: boolean): Action {
  return {
    type: UPDATE_MOVIE,
    payload: {id, seen}
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

export function addMovieThunk(movie: MovieData): ThunkAction {
  return async (dispatch) => {
    try {
      const movieFromDb = await postOneMovie(movie)
      dispatch(saveMovie(movieFromDb))
    } catch(err) {
      console.error('Action booboo: ', err)
      dispatch(error(String(err)))
    }
  }
}

export function updateSeenThunk(id: number, seen: boolean): ThunkAction {
  return async (dispatch) => {
    try {
      await patchMovie(id, seen)
      dispatch(updateMovie(id, seen))
    } catch (err) {
      console.error('Action booboo: ', err)
      dispatch(error(String(err)))
    }
  }
}