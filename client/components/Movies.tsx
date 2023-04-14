import { useAppSelector } from "../hooks/redux"
import { Movie } from "../../models/movies"

import SingleMovie from "./SingleMovie"

function Movies() {
  const movieList = useAppSelector(state => state.movies as Movie[])
  
  return (
    <>
      <div className="movie-container">
        {movieList.map(movie => (
          <SingleMovie key={movie.id} movie={movie} />
          ))}
      </div>
    </>
  )
}

export default Movies