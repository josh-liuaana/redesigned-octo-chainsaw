import { combineReducers } from 'redux'

import moviesReducers from './movies'
import imdbReducers from './imdb'
import loadingReducer from './loading'

export default combineReducers({
  movies: moviesReducers,
  imdb: imdbReducers,
  loading: loadingReducer
})
