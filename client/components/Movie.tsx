import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Movie as MovieData } from '../../common/Movie'
import * as api from '../apis/movies'

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

  if (movie == null) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h2>
        {movie.title} ({movie.release_year})
      </h2>
      {movie.categories && movie.categories.length && (
        <ul>
          {movie.categories.map((category) => (
            <li key={category.id}>
              <Link to={`/category/${category.id}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
