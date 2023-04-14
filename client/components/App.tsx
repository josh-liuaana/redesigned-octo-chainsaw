import { Routes, Route, Link } from 'react-router-dom'
import Home from './Home'

function App() {
  return (
    <>
      <header className="header">
        <h1>Movie Facts</h1>
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
