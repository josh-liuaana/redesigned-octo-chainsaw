import { Movie } from '../../common/Movie'
import { SearchAction } from '../actions/search'

interface SearchState {
  pending: boolean
  error: string | undefined
  results: Movie[] | undefined
}

const initalState: SearchState = {
  pending: false,
  error: undefined,
  results: undefined,
}

function reducer(state = initalState, action: SearchAction): SearchState {
  switch (action.type) {
    case 'search/failed':
      return { ...state, error: action.payload, results: undefined }

    case 'search/pending':
      return { pending: true, error: undefined, results: undefined }

    case 'search/receive':
      return { pending: false, error: undefined, results: action.payload }

    default:
      return state
  }
}

export default reducer
