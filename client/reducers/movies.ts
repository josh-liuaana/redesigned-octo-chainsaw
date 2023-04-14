import type { Action, Movie } from "../../models/movies";
import {  ERROR, SET_MOVIES} from '../actions/movies' // Action

const initialState = [] as Movie[]

export default function moviesReducers(state = initialState, action: Action) {
  const { type, payload } = action
  switch(type) {

    case SET_MOVIES:
      return payload

    case ERROR:
      return payload

    default:
      return state
  }
}