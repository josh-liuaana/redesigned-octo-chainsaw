import { useAppSelector, useAppDispatch } from "../hooks/redux"
import { useNavigate } from "react-router-dom"

import { addMovieThunk } from "../actions/movies"

function Trailer() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const imdbTrailer = useAppSelector(state => state.trailer)
  const imdbDetails = useAppSelector(state => state.details)

  const handleAdd = () => {
    const formattedMovie = {
      imdb_id: imdbTrailer.imDbId,
      title: imdbTrailer.title,
      img: imdbDetails.image,
      watched: false
    }    
    dispatch(addMovieThunk(formattedMovie))
    navigate('/')
  }
  
  return (
    <>
      <div className="trailer-info-container">
        <div className="trailer-container">
          <iframe allow="fullscreen" className="trailer-video" title={imdbTrailer.title} src={"https://www.youtube.com/embed/" + imdbTrailer.videoId} />
        </div>
        <div>
          <button type='submit' onClick={() => handleAdd()} className="button green-button modal-submit-button">Add to your watchlist</button>
        </div>
      </div>
    </>
  )
}

export default Trailer