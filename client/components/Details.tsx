import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../hooks/redux"
import { detailsThunk } from "../actions/imdb"

function Details() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const details = useAppSelector(state => state.details)

  useEffect(() => {
    dispatch(detailsThunk(id as string))
  }, [dispatch, id])
  
  const similarMovies = details.similars  
  
  return (
    <>
      <h1>{details.title}</h1>
      <h3>If you liked {details.title}, you may like these titles:</h3>
      <ul>
        {similarMovies && similarMovies.map((movie) => (
          <div key={movie.id}>
            <li>{movie.title}</li>
          </div>
        ))}
      </ul>
    </>
  )
}

export default Details