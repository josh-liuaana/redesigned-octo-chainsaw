import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './redux'
import * as actions from '../actions/categories'

function useCategories() {
  const dispatch = useAppDispatch()
  const {
    loading,
    error,
    data: categories,
  } = useAppSelector((state) => state.categories)

  useEffect(() => {
    dispatch(actions.fetchCategories())
  }, [dispatch])

  return { loading, error, categories }
}

export default useCategories
