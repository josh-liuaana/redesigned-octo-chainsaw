import { useAppSelector, useAppDispatch } from "../hooks/redux"
import { useNavigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

import { addMovieThunk } from "../actions/movies"
import { IfAuthenticated } from "./Authenticated"

function Trailer() {
  const { getAccessTokenSilently } = useAuth0()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const imdbTrailer = useAppSelector(state => state.trailer)
  const imdbDetails = useAppSelector(state => state.details)

  const handleAdd = async () => {
    const formattedMovie = {
      imdb_id: imdbTrailer.imDbId,
      title: imdbTrailer.title,
      img: imdbDetails.image,
      watched: false
    }
    const token = await getAccessTokenSilently()
    dispatch(addMovieThunk(formattedMovie, token))
    navigate('/')
  }
  
  return (
    <>
      <div className="trailer-info-container">
        <div className="trailer-container">
          <iframe allow="fullscreen" className="trailer-video" title={imdbTrailer.title} src={"https://www.youtube.com/embed/" + imdbTrailer.videoId} />
        </div>
        <div>
          <IfAuthenticated>
            <button type='submit' onClick={() => handleAdd()} className="button green-button modal-submit-button">Add to your watchlist</button>
          </IfAuthenticated>
        </div>
      </div>
    </>
  )
}

export default Trailer