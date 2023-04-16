import type { Action, Movie } from "../../models/movies";
import { ERROR, SET_MOVIES, DEL_MOVIE } from '../actions/movies'

const initialState = [] as Movie[]

export default function moviesReducers(state = initialState, action: Action) {
  const { type, payload } = action
  switch(type) {

    case SET_MOVIES:
      return payload

    case DEL_MOVIE:
      return state.filter(movie => movie.id !== payload)

    case ERROR:
      return payload

    default:
      return state
  }
}