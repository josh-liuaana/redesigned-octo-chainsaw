import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import { useAppDispatch } from '../hooks/redux'
import { getMovies } from '../actions/movies'
import { getUsers } from '../actions/users'

import Home from './Home'
import Search from './Search'
import SearchInfo from './SearchInfo'
import Trailer from './Trailer'
import Details from './Details'
import Nav from './Nav'


function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getMovies())
    dispatch(getUsers())
  }, [dispatch])
  
  return (
    <>

      <nav>
        <Nav />
      </nav>
      <section className="main">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search/>} />
          <Route path='/:id' element={<SearchInfo/>} />
          <Route path='/trailer/:id' element={<Trailer />} />
          <Route path='/details/:id' element={<Details />} />
        </Routes>
      </section>
    </>
  )
}

export default App
