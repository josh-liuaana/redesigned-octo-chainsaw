import type { Action, Movie } from "../../models/movies";
import { ERROR, SET_MOVIES, DEL_MOVIE, ADD_MOVIE, ALPHA_SORT, UPDATE_MOVIE, DATE_SORT } from '../actions/movies'

const initialState = [] as Movie[]

export default function moviesReducers(state = initialState, action: Action) {
  const { type, payload } = action
  switch(type) {

    case SET_MOVIES:
      return payload

    case ALPHA_SORT:
      state.sort((a, b) => b.title.localeCompare(a.title))
      return [...state]

    case DATE_SORT:
      state.sort((a, b) => b.date_added - a.date_added)
      return [...state]

    case DEL_MOVIE:
      return state.filter(movie => movie.id !== payload)

    case ADD_MOVIE:
      return [...state, payload]

    case UPDATE_MOVIE:
      return state.map((movie) => {
        if (movie.id === payload.id) {
          movie.watched = payload.seen
        }
        return movie
      })

    case ERROR:
      return payload

    default:
      return state
  }
}