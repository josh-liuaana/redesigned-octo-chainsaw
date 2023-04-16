import { useState } from "react"
import Movies from "./Movies"
import Search from "./Search"

function Home() {
  const [showSearch, setShowSearch] = useState(false as boolean)
  
  return (
    <>
      {!showSearch &&
        <button className='button search-button' onClick={() => setShowSearch(!showSearch)}>Search on imdb</button>
      }
      {showSearch
        ? <Search />
        : <Movies />
      }
    </>
  )
}

export default Home