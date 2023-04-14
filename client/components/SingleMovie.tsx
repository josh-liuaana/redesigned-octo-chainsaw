import { Movie } from "../../models/movies"

interface Props {
   movie: Movie
}

function SingleMovie({ movie }: Props) {
  
  return (
    <>
      <div className="movie">
        <h2 className="movie-title">{movie.title}</h2>
        <img src={movie.img} />
      </div>
    </>
  )
}

export default SingleMovie