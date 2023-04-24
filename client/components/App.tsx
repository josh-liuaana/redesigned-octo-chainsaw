import { Routes, Route, Link } from 'react-router-dom'
import { useEffect } from 'react'

import { useAppDispatch } from '../hooks/redux'
import { getMovies } from '../actions/movies'

import Home from './Home'
import Search from './Search'
import SearchInfo from './SearchInfo'
import Trailer from './Trailer'
import Details from './Details'


function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getMovies())
  }, [dispatch])
  
  return (
    <>
      <header className="header">
        <h1 className='title'>Mooo-vies 2.0</h1>
      </header>
      <nav>
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
