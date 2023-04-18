import { RECEIVE_MOVIES, REQUEST_MOVIES } from '../actions/loading'
import { LoadingAction } from '../../models/movies'

function loadingReducer(state = false, action: LoadingAction) {
  const { type } = action
  switch(type) {
    case REQUEST_MOVIES:
      return true

    case RECEIVE_MOVIES:
      return false

    default:
      return state
  }
}

export default loadingReducer