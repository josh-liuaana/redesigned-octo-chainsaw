import { useEffect, useState, UIEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Movie as MovieData, Category } from '../../common/Movie'
import * as api from '../apis/movies'
import AddCategoryForm from './AddCategoryForm'

export default function Movie() {
  const { id } = useParams()
  const [movie, setMovie] = useState<MovieData | null>(null)

  useEffect(() => {
    async function fetchData() {
      const data = await api.byIdWithCategories(Number(id))
      setMovie(data)
    }

    fetchData()
  }, [id])

  const onDeleteClicked = async (evt: UIEvent<HTMLButtonElement>) => {
    const { value } = evt.currentTarget
    if (isNaN(Number(id))) {
      return
    }

    await api.removeCategoryFromMovie(Number(id), Number(value))

    setMovie((previous) => {
      return (
        previous && {
          ...previous,
          categories: previous.categories?.filter(
            (cat) => cat.id !== Number(value)
          ),
        }
      )
    })
  }

  const handleAddCategory = async (category: Category) => {
    if (!movie || !movie.id) {
      return
    }

    await api.addCategoryToMovie(movie.id, category.id)
    setMovie((previous) => {
      if (!previous) {
        return null
      }

      const categories = previous?.categories || []

      return {
        ...previous,
        categories: [...categories, category].sort((a, b) => a.id - b.id),
      }
    })
  }

  if (movie == null) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h2>
        {movie.title} ({movie.release_year})
      </h2>
      <AddCategoryForm
        categories={movie.categories}
        onSubmit={handleAddCategory}
      />
      {movie.categories && movie.categories.length ? (
        <ul>
          {movie.categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={onDeleteClicked}
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
