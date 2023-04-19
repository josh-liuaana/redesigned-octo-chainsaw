import { useAppDispatch } from "../hooks/redux"

import { Movie } from "../../models/movies"
import { deleteMovieThunk } from "../actions/movies"

interface Props {
  movie: Movie
}

function SingleMovie({ movie }: Props) {
  console.log(movie.watched)
  const dispatch = useAppDispatch()

  const handleDelete = (id: number) => {
    dispatch(deleteMovieThunk(id))
  }

  const handleDetails = () => {
    alert('movie details')
  }

  const handleWatched = () => {
    alert('toggle watched')
  }

  return (
    <>
      <div className="movie">
        <div className="movie-img-container">
          {movie.watched
            ? <i className="movie-butt fa-regular fa-eye fa-xl" style={{color: "#006400"}} role="button" onClick={() => handleWatched()}></i>
            : <i className="movie-butt fa-regular fa-eye-slash fa-xl" style={{color: "#9e0000"}} role="button" onClick={() => handleWatched()}></i>
          }
          <h2 className="movie-title">{movie.title}</h2>
          <i className="movie-butt fa-solid fa-trash fa-xl" role="button" style={{color: "#9e0000"}} onClick={() => handleDelete(movie.id)} />
        </div>
        <img src={movie.img} alt={`movie poster for ${movie.title}`}/>
        <button className="button info-button" onClick={() => handleDetails()}>Movie Details</button>
      </div>
    </>
  )
}

export default SingleMovie