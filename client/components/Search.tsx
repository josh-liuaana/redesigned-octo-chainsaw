import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Movie, Category } from '../../common/Movie'
import * as api from '../apis/movies'
import * as CategoryApi from '../apis/categories'

export default function Search() {
  const [results, setResults] = useState([] as Movie[])
  const [categories, setCategories] = useState([] as Category[])
  const [formData, setFormData] = useState({
    title: '',
    categories: {} as Record<string, boolean>,
  })

  useEffect(() => {
    async function fetchData() {
      const data = await CategoryApi.all()
      setCategories(data)
    }

    fetchData()
  }, [])

  const onCheckboxChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = evt.currentTarget
    setFormData((prev) => ({
      ...prev,
      categories: { ...prev.categories, [value]: checked },
    }))
  }, [])

  const onInputChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  const onSubmit = useCallback(
    async (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault()
      const includeCategories = []
      for (const k in formData.categories) {
        if (formData.categories[k]) {
          includeCategories.push(Number(k))
        }
      }
      const result = await api.search(formData.title, includeCategories)
      setResults(result.body)
    },
    [formData.title, formData.categories]
  )

  if (!categories || categories.length === 0) {
    return <p>Loading...</p>
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
              onChange={onInputChange}
              value={formData.title}
            />
          </label>
        </div>
        <div>
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
                      checked={!!formData.categories[category.id]}
                      value={category.id}
                    />{' '}
                    <span>{category.name}</span>
                  </label>
                </li>
              ))}
            </ul>
          </label>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <ol>
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
