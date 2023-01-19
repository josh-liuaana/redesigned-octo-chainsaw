import * as api from '../apis/movies'
import { Movie } from '../../common/Movie'
import type { ThunkAction } from '../store'

export type MovieAction =
  | { type: 'movies/receive'; payload: Movie[] }
  | { type: 'movies/created'; payload: Movie }
  | { type: 'movies/pending'; payload: void }
  | { type: 'movies/failed'; payload: string }
  | { type: 'movies/delete'; payload: number }

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

export function created(movie: Movie): MovieAction {
  return { type: 'movies/created', payload: movie }
}

export function addMovie(movie: Movie): ThunkAction {
  return async (dispatch) => {
    dispatch(pending())
    try {
      const data = await api.create(movie)
      dispatch(created(data))
    } catch (e) {
      dispatch(failed(e instanceof Error ? e.message : 'Server error'))
    }
  }
}

export function deleted(id: number): MovieAction {
  return { type: 'movies/delete', payload: id }
}

export function deleteMovie(id: number): ThunkAction {
  return async (dispatch) => {
    dispatch(pending())
    try {
      await api.remove(id)
      dispatch(deleted(id))
    } catch (e) {
      dispatch(failed(e instanceof Error ? e.message : 'Server error'))
    }
  }
}
