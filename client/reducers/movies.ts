import { Movie } from '../../common/Movie'
import { MovieAction } from '../actions/movies'

interface MovieState {
  pending: boolean
  error: string | undefined
  data: Movie[]
}
const initalState: MovieState = { pending: true, error: undefined, data: [] }

function reducer(state = initalState, action: MovieAction): MovieState {
  switch (action.type) {
    case 'movies/failed':
      return { pending: false, error: action.payload, data: [] }

    case 'movies/pending':
      return { pending: true, error: undefined, data: [] }

    case 'movies/receive':
      return { pending: false, error: undefined, data: action.payload }

    default:
      return state
  }
}

export default reducer
