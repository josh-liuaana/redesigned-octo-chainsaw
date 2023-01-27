import { useEffect, UIEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Category } from '../../common/Movie'
import { useAppDispatch, useAppSelector } from '../hooks'
import * as actions from '../actions/movie-details'
import AddCategoryForm from './AddCategoryForm'

function useDetails(id: number) {
  const dispatch = useAppDispatch()
  const {
    pending,
    error,
    data: details,
  } = useAppSelector((state) => state.details)

  useEffect(() => {
    dispatch(actions.fetchMovie(id))
  }, [id, dispatch])

  const deleteCategory = (id: number) => {
    dispatch(actions.deleteCategory(id))
  }
  const addCategory = (c: Category) => {
    dispatch(actions.addCategory(c))
  }

  return { pending, error, details, deleteCategory, addCategory }
}

export default function Movie() {
  const { id } = useParams()
  const { pending, error, details, addCategory, deleteCategory } = useDetails(
    Number(id)
  )

  const handleDeleteClicked = async (evt: UIEvent<HTMLButtonElement>) => {
    const { value } = evt.currentTarget
    deleteCategory(Number(value))
  }

  const handleAddCategory = async (category: Category) => {
    addCategory(category)
  }

  if (pending || !details) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Failed: {error}</p>
  }

  return (
    <div>
      <h2>
        {details.title} ({details.release_year})
      </h2>
      <AddCategoryForm
        categories={details.categories}
        onSubmit={handleAddCategory}
      />
      {details.categories && details.categories.length ? (
        <ul>
          {details.categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={handleDeleteClicked}
                value={category.id}
                aria-label={`delete category ${category.name}`}
              >
                delete
              </button>
              <Link to={`/category/${category.id}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <>No categories</>
      )}
    </div>
  )
}
