import { ChangeEvent, FormEvent, useState } from "react"
import { Link } from "react-router-dom"

import { searchImdb } from "../apis/imdb"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { ImdbMovie } from '../../models/movies'

import SearchResult from "./SearchResult"
import Loading from "./Loading"
import { receiveMovies, requestMovies } from "../actions/loading"
import { searchThunk } from "../actions/imdb"


function Search() {
  const dispatch = useAppDispatch()
  const displayLoading = useAppSelector((state => state.loading)) 
  const imdbSearchData = useAppSelector<ImdbMovie[]>((state => state.imdb))

  const [search, setSearch] = useState('' as string)
  const [showSearch, setShowSearch] = useState(true as Boolean)
  // NO THUNKY
  const [imdbData, setImdbData] = useState([] as ImdbMovie[])

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault()
    dispatch(requestMovies())

    // NO THUNKY
    // const searchResults = await searchImdb(search)
    // setImdbData(searchResults)

    // THUNKY 
    await dispatch(searchThunk(search))
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
            <form onSubmit={handleSubmit} aria-label="Add movie">
              <label className="form-label">Search movie
                <input type="text" name='search' onChange={handleChange} placeholder="Lord of the Rings..."/>
              </label>
              <input role="button" className="button green-button" type='submit' value='Search' />
            </form>
          : 
            // NO THUNKY 
            // <div className="search-result-container">
            //   {imdbData && imdbData.map((movie: ImdbMovie) => (
            //     <SearchResult movie={movie} key={movie.id}/>
            //   ))}
            // </div>

            // THUNKY
            <div className="search-result-container">
              {imdbSearchData && imdbSearchData.map((movie: ImdbMovie) => (
                <SearchResult movie={movie} key={movie.id}/>
              ))}
            </div>
      }

    </div>
  )
}

export default Search