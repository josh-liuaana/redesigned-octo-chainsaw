import { useEffect } from 'react'
import { fetchMovies } from '../actions/movies'
import { useAppDispatch, useAppSelector } from '../hooks'

function App() {
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
    <>
      <header className="header">
        <h1>My Collection</h1>
      </header>
      <section className="main">
        {data.map((movie) => (
          <div key={movie.id}>
            {movie.title} ({movie.release_year})
          </div>
        ))}
      </section>
    </>
  )
}

export default App
