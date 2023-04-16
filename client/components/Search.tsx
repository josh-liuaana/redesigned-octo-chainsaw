import { ChangeEvent, FormEvent, useState } from "react"
import { searchImdb } from "../apis/imdb"
import { ImdbMovie } from '../../models/movies'
import SearchResult from "./SearchResult"


function Search() {
  const [search, setSearch] = useState('' as string)
  const [imdbData, setImdbData] = useState([] as ImdbMovie[])

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault()
    const searchResults = await searchImdb(search)
    setImdbData(searchResults)
  }

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value)
  }
  
  return (
    <div className="form-container">

      <form onSubmit={handleSubmit}>
        <label className="form-label">Search movie
          <input type="text" name='search' onChange={handleChange} placeholder="Lord of the Rings..."/>
        </label>
        <input className="button green-button" type='submit' value='Search' />
      </form>

      <div className="search-result-container">
        {imdbData && imdbData.map((movie: ImdbMovie) => (
          <SearchResult movie={movie} />
          // <div key={movie.id}>
          //   <h3>{movie.title}</h3>
          // </div>
        ))}
      </div>

    </div>
  )
}

export default Search