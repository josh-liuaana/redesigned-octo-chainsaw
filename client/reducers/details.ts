import type { ImdbAction, ImdbDetails } from '../../models/movies'
import { IMDB_DETAILS } from "../actions/imdb"

const initialState = {} as ImdbDetails

export default function detailsReducer(state = initialState, action: ImdbAction) {
  const { type, payload } = action
  switch(type) {
    case IMDB_DETAILS:
      return payload

    default:
      return state
  }
}
