import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../hooks/redux"

import { Movie } from "../../models/movies"
import { deleteMovieThunk, updateSeenThunk } from "../actions/movies"

interface Props {
  movie: Movie
}

function SingleMovie({ movie }: Props) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleDelete = (id: number) => {
    dispatch(deleteMovieThunk(id))
  }

  const handleDetails = (id: string) => {
    navigate(`/details/${id}`)
  }

  const handleWatched = (id: number, seen: boolean) => {
    dispatch(updateSeenThunk(id, seen))
  }

  return (
    <>
      <div className="movie">
        <div className="movie-img-container">
          {movie.watched
            ? <i className="movie-butt fa-regular fa-eye fa-xl" style={{color: "#006400"}} role="button" onClick={() => handleWatched(movie.id, false)}></i>
            : <i className="movie-butt fa-regular fa-eye-slash fa-xl" style={{color: "#9e0000"}} role="button" onClick={() => handleWatched(movie.id, true)}></i>
          }
          <h2 className="movie-title">{movie.title}</h2>
          <i className="movie-butt fa-solid fa-trash fa-xl" role="button" style={{color: "#9e0000"}} onClick={() => handleDelete(movie.id)} />
        </div>
        <img src={movie.img} alt={`movie poster for ${movie.title}`}/>
        <button className="button info-button" onClick={() => handleDetails(movie.imdb_id)}>Movie Details</button>
      </div>
    </>
  )
}

export default SingleMovie