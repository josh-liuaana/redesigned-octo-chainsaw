import { ChangeEvent, FormEvent, useState } from "react"
import { Link } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { searchImdb } from "../apis/imdb"
import { ImdbMovie } from '../../models/movies'

import SearchResult from "./SearchResult"
import Loading from "./Loading"
import { receiveMovies, requestMovies } from "../actions/loading"


function Search() {
  const dispatch = useAppDispatch()
  const displayLoading = useAppSelector((state => state.loading)) 

  const [search, setSearch] = useState('' as string)
  const [imdbData, setImdbData] = useState([] as ImdbMovie[])
  const [showSearch, setShowSearch] = useState(true as Boolean)

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault()
    dispatch(requestMovies())
    const searchResults = await searchImdb(search)
    setImdbData(searchResults)
    dispatch(receiveMovies())
    setShowSearch(false)
  }

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value)
  }
  
  return (
    <div className="form-container">
      <div>
        <Link to='/'>
          <button className='button home-button' onClick={() => setShowSearch(false)}>Back Home</button>
        </Link>
      </div>

      {displayLoading 
        ?
          <Loading />
        :
        showSearch 
          ? 
            <form onSubmit={handleSubmit}>
              <label className="form-label">Search movie
                <input type="text" name='search' onChange={handleChange} placeholder="Lord of the Rings..."/>
              </label>
              <input className="button green-button" type='submit' value='Search' />
            </form>
          : 
            <div className="search-result-container">
              {imdbData && imdbData.map((movie: ImdbMovie) => (
                <SearchResult movie={movie} key={movie.id}/>
              ))}
            </div>
      }

    </div>
  )
}

export default Search