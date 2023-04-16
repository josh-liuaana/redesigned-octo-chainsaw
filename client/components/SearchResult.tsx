import { ImdbMovie } from "../../models/movies"

interface Props {
  movie: ImdbMovie
}

function SearchResult({ movie }: Props) {
  
  return (
    <>
      <div className="search-movie">
        <h3 className="search-title">{movie.title}</h3>
        <img src={movie.image} alt={`movie poster for ${movie.title}`} />
        <button className="button green-button">Add to watchlist</button>
      </div>
    </>
  )
}

export default SearchResult