import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import { useAppDispatch } from '../hooks/redux'
import { getMovies } from '../actions/movies'
import { getUserIds } from '../actions/users'

import Home from './Home'
import Search from './Search'
import SearchInfo from './SearchInfo'
import Trailer from './Trailer'
import Details from './Details'
import Nav from './Nav'
import User from './User'


function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getMovies())
    dispatch(getUserIds())
  }, [dispatch])
  
  return (
    <>
      <nav>
        <Nav />
      </nav>
      <section className="main">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user' element={<User />} />
          <Route path='/search' element={<Search/>} />
          <Route path='/trailer/:id' element={<Trailer />} />
          <Route path='/details/:id' element={<Details />} />
          <Route path='/:id' element={<SearchInfo/>} />
        </Routes>
      </section>
    </>
  )
}

export default App
