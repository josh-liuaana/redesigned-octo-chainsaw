import * as api from '../apis/categories'
import { Category } from '../../common/Movie'
import type { ThunkAction } from '../store'

export type CategoryAction =
  | { type: 'categories/receive'; payload: Category[] }
  | { type: 'categories/created'; payload: Category }
  | { type: 'categories/pending'; payload: void }
  | { type: 'categories/failed'; payload: string }
  | { type: 'categories/delete'; payload: number }

export function receive(categories: Category[]): CategoryAction {
  return { type: 'categories/receive', payload: categories }
}

export function pending(): CategoryAction {
  return { type: 'categories/pending' } as CategoryAction
}

export function failed(reason: string): CategoryAction {
  return { type: 'categories/failed', payload: reason }
}

export function fetchCategories(): ThunkAction {
  return async (dispatch, getState) => {
    const { categories } = getState()
    if (!categories.pending && !categories.data) {
      dispatch(pending())
      try {
        const data = await api.all()
        dispatch(receive(data))
      } catch (e) {
        dispatch(failed(e instanceof Error ? e.message : String(e)))
      }
    }
  }
}
