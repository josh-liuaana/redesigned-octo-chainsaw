import { useNavigate } from "react-router-dom"
import { ChangeEvent, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import Modal from 'react-modal'

import { useAppDispatch } from "../hooks/redux"
import { addMovieThunk } from "../actions/movies"
import { ImdbMovie } from "../../models/movies"
import { detailsThunk, trailerThunk } from "../actions/imdb"

import SearchInfo from "./SearchInfo"

interface Props {
  movie: ImdbMovie
}

function SearchResult({ movie }: Props) {
  const { getAccessTokenSilently } = useAuth0() 
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [modalIsOpen, setIsOpen] = useState(false)
  const [infoModal, setInfoModal] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  const handleAdd = async (movie: ImdbMovie) => {
    const formattedMovie = {
      imdb_id: movie.id,
      title: movie.title,
      img: movie.image,
      watched: isChecked
    }
    const token = await getAccessTokenSilently()
    dispatch(addMovieThunk(formattedMovie, token))
    navigate('/')
  }

  const toggleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked)
  }

  const handleInfo = async (id: string) => {
    dispatch(detailsThunk(id))
    dispatch(trailerThunk(id))
    setInfoModal(true)
  }

  return (
    <>
      <div className="search-movie">
        <h3 className="search-title">{movie.title}</h3>
        <img src={movie.image} alt={`movie poster for ${movie.title}`} />
        <button className="button green-button" onClick={() => setIsOpen(true)}>Add</button>
        <button className="button blue-button" onClick={() => handleInfo(movie.id)}>Info</button>

        <Modal
          isOpen={infoModal}
          onRequestClose={() => setInfoModal(false)}
          className='info-modal'
          contentLabel='Info Modal'
        >
          <SearchInfo />
        </Modal>

        <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        className='modal-container'
        contentLabel="Add Movie Modal"
        >
          <div className="modal-contents">
            <div className="modal-image-container">
              <button  onClick={() => setIsOpen(false)}className="close">X</button>
              <img className="modal-image" src={movie.image} alt={`movie poster for ${movie.title}`} />
            </div>
            <div className="modal-form-container">
              <form className="modal-form" onSubmit={() => handleAdd(movie)}>
                <h2>{movie.title}</h2>
                <div className="label ">
                  <label htmlFor="watched">Have you seen this movie?</label>
                </div>
                <div className="form-checkbox">
                    <input type="checkbox" id="watched" name="watched" checked={isChecked} onChange={toggleHandler}/>
                    <span className="checkmark"></span>
                </div>
                <div>
                  <button type='submit' className="button green-button modal-submit-button">Add to your watchlist</button>
                </div>
              </form>
              
            </div>
          </div>
        </Modal>

      </div>
    </>
  )
}

export default SearchResult