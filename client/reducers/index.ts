import { combineReducers } from 'redux'

import moviesReducers from './movies'
import imdbReducers from './imdb'
import loadingReducer from './loading'
import detailsReducer from './details'

export default combineReducers({
  movies: moviesReducers,
  imdb: imdbReducers,
  details: detailsReducer,
  loading: loadingReducer
})
