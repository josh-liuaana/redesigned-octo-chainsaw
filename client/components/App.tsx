import { Routes, Route, Link } from 'react-router-dom'
import { useEffect } from 'react'

import { useAppDispatch } from '../hooks/redux'
import { getMovies } from '../actions/movies'

import Home from './Home'


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
      <nav></nav>
      <section className="main">
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </section>
    </>
  )
}

export default App
