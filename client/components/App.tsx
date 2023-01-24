import { Routes, Route, Link } from 'react-router-dom'
import MovieList from './MovieList'
import Movie from './Movie'
import Search from './Search'
import Home from './Home'
import Category from './Category'
import CategoryList from './CategoryList'

function App() {
  return (
    <>
      <header className="header">
        <h1>Movie Facts</h1>
      </header>
      <nav>
        <ul>
          <li>
            <Link to="/movie">All movies</Link>
          </li>

          <li>
            <Link to="/category">All categories</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
        </ul>
      </nav>
      <section className="main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/movie">
            <Route index element={<MovieList />} />
            <Route path=":id" element={<Movie />} />
          </Route>
          <Route path="/category">
            <Route index element={<CategoryList />} />
            <Route path=":id" element={<Category />} />
          </Route>
          <Route path="/search" element={<Search />} />
        </Routes>
      </section>
    </>
  )
}

export default App
