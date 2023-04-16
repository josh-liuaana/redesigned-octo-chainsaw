import { combineReducers } from 'redux'
import moviesReducers from './movies'
import imdbReducers from './imdb'

export default combineReducers({
  movies: moviesReducers,
  imdb: imdbReducers
})
