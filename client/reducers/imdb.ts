import type { ImdbAction, ImdbMovie } from "../../models/movies";
import { IMDB_SEARCH } from "../actions/imdb";

const initialState = [] as ImdbMovie[]

export default function imdbReducers(state = initialState, action: ImdbAction) {
  const { type, payload } = action
  switch(type) {

    case IMDB_SEARCH:
      return payload

    default:
      return state
  }
}