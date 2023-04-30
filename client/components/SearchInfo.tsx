import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

import { ImdbDetails } from "../../models/movies";
import { addMovieThunk } from "../actions/movies";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { IfAuthenticated } from "./Authenticated"

function SearchInfo() {
  const { getAccessTokenSilently } = useAuth0()
  const imdbDetails = useAppSelector((state => state.details))
  const imdbTrailer = useAppSelector((state => state.trailer))
  const [showTrailer, setShowTrailer] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleAdd = async (movie: ImdbDetails) => {
    const formattedMovie = {
      imdb_id: imdbDetails.id,
      title: imdbDetails.title,
      img: imdbDetails.image,
      watched: false
    }
    const token = await getAccessTokenSilently()
    dispatch(addMovieThunk(formattedMovie, token))
    navigate('/')
  }

  const trailerNavigate = (id: string) => {
    navigate(`/trailer/${id}`)
  }

  return (
    <div className="info-component">
      {
        showTrailer
          ?
          <div className="trailer-info-container">
            <div className="trailer-container">
              <iframe allow="fullscreen" className="trailer-video" title={imdbDetails.title} src={"https://www.youtube.com/embed/" + imdbTrailer.videoId} />
            </div>
            <div>
              <button type='submit' onClick={() => handleAdd(imdbDetails)} className="button green-button modal-submit-button">Add to your watchlist</button>
            </div>
          </div>
          :
          <div className="info-container">
            <img src={imdbDetails.image} alt={`movie poster for ${imdbDetails.title}`}/>
            <div className="info-details">
              <h1>{imdbDetails.title}</h1>
              <p>{imdbDetails.plot}</p>
              <p>imDb rating: {imdbDetails.imDbRating}</p>
              <p>MetaCritic rating: {imdbDetails.metacriticRating}</p>
              <div>
                {/* <button onClick={() => setShowTrailer(!showTrailer)} className="button blue-button trailer-button" >Watch Trailer</button> */}
                <button onClick={() => trailerNavigate(imdbDetails.id)} className="button blue-button trailer-button" >Watch Trailer</button>
                <IfAuthenticated>
                  <button type='submit' onClick={() => handleAdd(imdbDetails)} className="button green-button modal-submit-button">Add to your watchlist</button>
                </IfAuthenticated>
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default SearchInfo