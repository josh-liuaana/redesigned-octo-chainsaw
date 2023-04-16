import { useAppDispatch } from "../hooks/redux"
import { Movie } from "../../models/movies"
import { deleteMovieThunk } from "../actions/movies"

interface Props {
   movie: Movie
}

function SingleMovie({ movie }: Props) {
  const dispatch = useAppDispatch()

  const handleDelete = (id: number) => {
    dispatch(deleteMovieThunk(id))
  }
  
  return (
    <>
      <div className="movie">
        <h2 className="movie-title">{movie.title}</h2>
        <img src={movie.img} alt={`movie poster for ${movie.title}`}/>
        <button onClick={() => handleDelete(movie.id)}>Delete</button>
      </div>
    </>
  )
}

export default SingleMovie