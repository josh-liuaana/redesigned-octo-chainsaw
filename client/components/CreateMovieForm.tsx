import { useState, FormEvent, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/redux'
import * as actions from '../actions/movies'

function CreateMovieForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [{ title, release_year }, setFormValues] = useState({
    title: '',
    release_year: 1984,
  })

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const id = await dispatch(actions.addMovie({ title, release_year }))
    if (id != null) {
      navigate(`/movie/${id}`)
    }
  }

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget
    setFormValues((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  return (
    <>
      <form onSubmit={onSubmit} aria-label="Create movie">
        <div>
          <label>
            <span>Title</span>
            <input type="text" name="title" value={title} onChange={onChange} />
          </label>
        </div>
        <div>
          <label>
            <span>Release Year</span>
            <input
              type="number"
              name="release_year"
              value={release_year}
              onChange={onChange}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default CreateMovieForm
