import { useState } from "react";
import { ImdbDetails } from "../../models/movies";
import { useAppSelector } from "../hooks/redux";

function SearchInfo() {
  const imdbDetails = useAppSelector((state => state.details))
  // const [info, setInfo] = useState({} as ImdbDetails)
  console.log(imdbDetails)

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
            <button type='submit' className="button green-button modal-submit-button">Add to your watchlist</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchInfo