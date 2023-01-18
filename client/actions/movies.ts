import * as api from '../apis/movies'
import { Movie } from '../../common/Movie'
import type { ThunkAction } from '../store'

export type MovieAction =
  | { type: 'movies/receive'; payload: Movie[] }
  | { type: 'movies/pending'; payload: void }
  | { type: 'movies/failed'; payload: string }

export function receive(movies: Movie[]): MovieAction {
  return { type: 'movies/receive', payload: movies }
}

export function pending(): MovieAction {
  return { type: 'movies/pending' } as MovieAction
}

export function failed(reason: string): MovieAction {
  return { type: 'movies/failed', payload: reason }
}

export function fetchMovies(): ThunkAction {
  return async (dispatch) => {
    dispatch(pending())
    try {
      const data = await api.all()
      dispatch(receive(data))
    } catch (e) {
      dispatch(failed(e instanceof Error ? e.message : 'Server error'))
    }
  }
}
