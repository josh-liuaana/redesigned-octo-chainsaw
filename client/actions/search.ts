import * as api from '../apis/movies'
import { Movie } from '../../common/Movie'
import type { ThunkAction } from '../store'

export type SearchAction =
  | { type: 'search/receive'; payload: Movie[] }
  | { type: 'search/created'; payload: Movie }
  | { type: 'search/pending'; payload: void }
  | { type: 'search/failed'; payload: string }
  | { type: 'search/delete'; payload: number }

export function receive(movies: Movie[]): SearchAction {
  return { type: 'search/receive', payload: movies }
}

export function pending(): SearchAction {
  return { type: 'search/pending' } as SearchAction
}

export function failed(reason: string): SearchAction {
  return { type: 'search/failed', payload: reason }
}

export function runSearch(
  title: string | undefined,
  categories: number[]
): ThunkAction {
  return async (dispatch) => {
    dispatch(pending())
    try {
      const data = await api.search(title, categories)
      dispatch(receive(data))
    } catch (e) {
      dispatch(failed(e instanceof Error ? e.message : 'Server error'))
    }
  }
}