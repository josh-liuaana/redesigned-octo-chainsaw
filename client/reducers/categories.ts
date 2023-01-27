import { Category } from '../../common/Movie'
import { CategoryAction } from '../actions/categories'

interface CategoryState {
  pending: boolean
  error: string | undefined
  data: Category[] | undefined
}

const initalState: CategoryState = {
  pending: false,
  error: undefined,
  data: undefined,
}

function reducer(state = initalState, action: CategoryAction): CategoryState {
  switch (action.type) {
    case 'categories/failed':
      return { pending: false, error: action.payload, data: undefined }

    case 'categories/pending':
      return { pending: true, error: undefined, data: undefined }

    case 'categories/receive':
      return { pending: false, error: undefined, data: action.payload }

    default:
      return state
  }
}

export default reducer
