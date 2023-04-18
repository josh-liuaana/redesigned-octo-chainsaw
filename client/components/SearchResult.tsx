import { useNavigate } from "react-router-dom"
import Modal from 'react-modal'
import { ChangeEvent, useState } from "react"

import { useAppDispatch } from "../hooks/redux"
import { addMovieThunk } from "../actions/movies"
import { ImdbMovie } from "../../models/movies"

interface Props {
  movie: ImdbMovie
}

function SearchResult({ movie }: Props) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [modalIsOpen, setIsOpen] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  const handleAdd = (movie: ImdbMovie) => {
    const formattedMovie = {
      imdb_id: movie.id,
      title: movie.title,
      img: movie.image,
      watched: isChecked
    }    
    dispatch(addMovieThunk(formattedMovie))
    navigate('/')
  }

  const toggleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="search-movie">
        <h3 className="search-title">{movie.title}</h3>
        <img src={movie.image} alt={`movie poster for ${movie.title}`} />
        <button className="button green-button" onClick={openModal}>Add</button>

        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className='modal-container'
        contentLabel="Add Movie Modal"
        >
          <div className="modal-contents">
            <div className="modal-image-container">
              <button  onClick={() => closeModal()}className="close">X</button>
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