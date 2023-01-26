import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as actions from '../actions/search'
import * as categoryActions from '../actions/categories'
import { useAppDispatch, useAppSelector } from '../hooks'

function useSearch() {
  const dispatch = useAppDispatch()
  const { results, pending, error } = useAppSelector((state) => state.search)

  function search(title: string | undefined, categories: number[]) {
    dispatch(actions.runSearch(title, categories))
  }

  return { results, pending, error, search }
}

function useCategories() {
  const dispatch = useAppDispatch()
  const {
    pending,
    error,
    data: categories,
  } = useAppSelector((state) => state.categories)

  useEffect(() => {
    dispatch(categoryActions.fetchCategories())
  }, [dispatch])

  return { pending, error, categories }
}

function Search() {
  const { search, results, pending, error } = useSearch()
  const [formData, setFormData] = useState({
    title: '',
    categories: [] as number[],
  })

  const handleInputChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = evt.currentTarget
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    },
    []
  )

  const handleCategoryChange = useCallback((categories: number[]) => {
    setFormData((prev) => ({ ...prev, categories }))
  }, [])

  const onSubmit = useCallback(
    async (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault()
      search(formData.title, formData.categories)
    },
    [search, formData.title, formData.categories]
  )

  if (pending) {
    return <>Loading...</>
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            <span>Title</span>
            <input
              type="text"
              name="title"
              onChange={handleInputChange}
              value={formData.title}
            />
          </label>
        </div>
        <div>
          <CategoryPicker
            onChange={handleCategoryChange}
            selected={formData.categories}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <ol>
        {error && <p>Search failed: {error}</p>}
        {results && <>{results.length} matching results</>}
        {results &&
          results.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                {movie.title} ({movie.release_year})
              </Link>
            </li>
          ))}
      </ol>
    </>
  )
}

interface CategoryPickerProps {
  onChange: (categories: number[]) => void
  selected: number[]
}

function CategoryPicker({ onChange, selected }: CategoryPickerProps) {
  const onCheckboxChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = evt.currentTarget
      const id = Number(value)
      if (isNaN(id)) {
        return
      }
      if (checked) {
        onChange([...selected, id].sort())
      } else {
        onChange(selected.filter((v) => v != id))
      }
    },
    [onChange, selected]
  )

  const { pending, error, categories } = useCategories()

  if (pending || !categories) {
    return <>Loading...</>
  }

  if (error) {
    return <>Failed to load categories</>
  }

  return (
    <label>
      <span>Category</span>
      <ul>
        {categories.map((category) => (
          <li key={category.name}>
            <label>
              <input
                type="checkbox"
                name={`category`}
                onChange={onCheckboxChange}
                checked={selected.includes(category.id)}
                value={category.id}
              />{' '}
              <span>{category.name}</span>
            </label>
          </li>
        ))}
      </ul>
    </label>
  )
}

export default Search
