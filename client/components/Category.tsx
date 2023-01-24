import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Movie } from '../../common/Movie'
import * as api from '../apis/movies'

export default function Category() {
  const { id } = useParams()
  const [movies, setMovies] = useState(null as Movie[] | null)

  useEffect(() => {
    const load = async () => {
      const data = await api.byCategory(Number(id))
      setMovies(data)
    }

    load()
  }, [id])

  if (movies == null) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Category - {id}</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              {movie.title} ({movie.release_year})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
