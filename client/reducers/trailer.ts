import type { ImdbAction, ImdbTrailer} from '../../models/movies'
import { IMDB_TRAILER } from "../actions/imdb"

const initialState = {} as ImdbTrailer

export default function trailerReducer(state = initialState, action: ImdbAction) {
  const { type, payload } = action
  
  switch(type) {
    
    case IMDB_TRAILER:
      return payload

    default:
      return state
  }
}
