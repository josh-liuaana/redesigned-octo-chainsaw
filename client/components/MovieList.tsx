import { useEffect } from 'react'
import { fetchMovies } from '../actions/movies'
import { useAppDispatch, useAppSelector } from '../hooks'

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
    <ul>
      {data.map((movie) => (
        <li key={movie.id}>
          <h2>
            {movie.title} ({movie.release_year})
          </h2>
        </li>
      ))}
    </ul>
  )
}

export default MovieList
