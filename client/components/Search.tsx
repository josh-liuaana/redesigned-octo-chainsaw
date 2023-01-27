import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import useSearch from '../hooks/useSearch'
import CategoryPicker from './CategoryPicker'

function Search() {
  const { search, results, loading, error } = useSearch()
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

  if (loading) {
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

export default Search
