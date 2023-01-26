import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as actions from '../actions/categories'
import { useAppDispatch, useAppSelector } from '../hooks'

export default function CategoryList() {
  const dispatch = useAppDispatch()
  const {
    pending,
    error,
    data: categories,
  } = useAppSelector((state) => state.categories)

  useEffect(() => {
    dispatch(actions.fetchCategories())
  }, [dispatch])

  if (pending) {
    return <p>Loading ...</p>
  }

  if (error) {
    return <p>Error! {error}</p>
  }

  return (
    <div>
      <h2>All categories</h2>
      <ul>
        {categories?.map((category) => (
          <li key={category.id}>
            <Link to={`/category/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
