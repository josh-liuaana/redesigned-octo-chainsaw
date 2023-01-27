import { Movie } from '../../common/Movie'
import { DetailsAction } from '../actions/details'

interface DetailsState {
  pending: boolean
  error: string | undefined
  data: Movie | undefined
}

const initalState: DetailsState = {
  pending: false,
  error: undefined,
  data: undefined,
}

function reducer(state = initalState, action: DetailsAction): DetailsState {
  switch (action.type) {
    case 'details/failed':
      return { pending: false, error: action.payload, data: undefined }

    case 'details/pending':
      return { pending: true, error: undefined, data: undefined }

    case 'details/receive':
      return { pending: false, error: undefined, data: action.payload }

    case 'details/category-deleted':
      return {
        pending: false,
        error: undefined,
        data: state.data && {
          ...state.data,
          categories: state.data.categories!.filter(
            (c) => c.id !== action.payload
          ),
        },
      }

    case 'details/category-added':
      return {
        pending: false,
        error: undefined,
        data: state.data && {
          ...state.data,
          categories: [...state.data.categories!, action.payload].sort(),
        },
      }

    default:
      return state
  }
}

export default reducer
