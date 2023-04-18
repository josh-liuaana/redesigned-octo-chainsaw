import { useState } from "react"
import { useAppSelector } from "../hooks/redux"
import { Movie } from "../../models/movies"
import { alphaSort } from "../actions/movies"
import { useAppDispatch } from "../hooks/redux"

import SingleMovie from "./SingleMovie"

function Movies() {
  const dispatch = useAppDispatch()
  const movieList = useAppSelector(state => state.movies as Movie[])
  const [listOrder, setListOrder] = useState(false as boolean)

  const reverseList = movieList
  .slice(0).reverse().map(movie => movie)

  function sort() {
    dispatch(alphaSort())
  }
  
  return (
    <>
      <button className='button reverse-button' onClick={() => setListOrder(!listOrder)}>Reverse Order</button>
      <button className='button sort-button' onClick={sort}>Sort alphabetically</button>
      <div className="movie-container">
        {
        listOrder
          ?
            movieList.map(movie => (
              <SingleMovie key={movie.id} movie={movie} />
            ))
          :
            reverseList.map(movie => (
              <SingleMovie key={movie.id} movie={movie} />
            ))
        }
      </div>
    </>
  )
}

export default Movies