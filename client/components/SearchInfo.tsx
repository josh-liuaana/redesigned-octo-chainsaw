import { useNavigate } from "react-router-dom";

import { ImdbDetails } from "../../models/movies";
import { addMovieThunk } from "../actions/movies";
import { useAppSelector, useAppDispatch } from "../hooks/redux";

function SearchInfo() {
  const imdbDetails = useAppSelector((state => state.details))
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleAdd = (movie: ImdbDetails) => {
    const formattedMovie = {
      imdb_id: imdbDetails.id,
      title: imdbDetails.title,
      img: imdbDetails.image,
      watched: false
    }
    dispatch(addMovieThunk(formattedMovie))
    navigate('/')
  }

  return (
    <div className="info-component">
      <div className="info-container">
        <img src={imdbDetails.image} alt={`movie poster for ${imdbDetails.title}`}/>
        <div className="info-details">
          <h1>{imdbDetails.title}</h1>
          <p>{imdbDetails.plot}</p>
          <p>imDb rating: {imdbDetails.imDbRating}</p>
          <p>MetaCritic rating: {imdbDetails.metacriticRating}</p>
          <div>
            <button className="button blue-button trailer-button">Watch Trailer</button>
            <button type='submit' onClick={() => handleAdd(imdbDetails)} className="button green-button modal-submit-button">Add to your watchlist</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchInfo