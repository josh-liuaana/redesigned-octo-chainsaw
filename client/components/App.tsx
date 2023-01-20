import { Routes, Route } from 'react-router-dom'
import MovieList from './MovieList'
import Movie from './Movie'
import Search from './Search'
import Home from './Home'

function App() {
  return (
    <>
      <header className="header">
        <h1>My Collection</h1>
      </header>
      <section className="main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/movie">
            <Route index element={<MovieList />} />
            <Route path=":id" element={<Movie />} />
          </Route>
          <Route path="/search" element={<Search />} />
        </Routes>
      </section>
    </>
  )
}

export default App
