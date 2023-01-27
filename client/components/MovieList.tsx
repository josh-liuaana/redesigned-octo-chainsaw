import { useEffect } from 'react'
import { fetchMovies } from '../actions/movies'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { Link } from 'react-router-dom'
import CreateMovieForm from './CreateMovieForm'

function MovieList() {
  const { pending, error, data } = useAppSelector((state) => state.movies)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  if (pending) {
    return <>Loading ...</>
  }

  if (error) {
    return <>Failed: {error}</>
  }

  return (
    <div>
      <h2>All movies</h2>
      <CreateMovieForm />
      <ul>
        {data.map((movie) => (
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

export default MovieList
