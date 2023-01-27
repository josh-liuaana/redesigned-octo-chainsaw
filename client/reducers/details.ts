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

/* eslint-disable @typescript-eslint/no-non-null-assertion */
// TODO: this is a bit awkward because we have used an optional property `categories`
// in an instance where we are pretty sure that property exists. We could use a different
// type or just live with slightly weird coverage stats... in this case I'm using a non-null
// assertion but I'll probably revisit this in time

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
