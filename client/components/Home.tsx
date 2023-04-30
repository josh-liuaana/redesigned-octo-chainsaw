import { Link } from "react-router-dom"
import { useState } from "react"
import Movies from "./Movies"
import Search from "./Search"

function Home() {
  const [showSearch, setShowSearch] = useState(false as boolean)
  
  return (
    <>
      {showSearch
        ? 
          <Search />
        : 
        <>
          <Link to='/search'>
            <button className='button search-button' onClick={() => setShowSearch(true)}>Search on imdb</button>
          </Link>
          <Movies />
        </>
      }
    </>
  )
}

export default Home