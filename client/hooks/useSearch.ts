import { useAppDispatch, useAppSelector } from './redux'
import * as actions from '../actions/search'

function useSearch() {
  const dispatch = useAppDispatch()
  const { results, pending, error } = useAppSelector((state) => state.search)

  function search(title: string | undefined, categories: number[]) {
    dispatch(actions.runSearch(title, categories))
  }

  return { results, pending, error, search }
}

export default useSearch
