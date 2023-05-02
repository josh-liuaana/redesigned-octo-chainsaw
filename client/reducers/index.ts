import { combineReducers } from 'redux'

import moviesReducers from './movies'
import imdbReducers from './imdb'
import loadingReducer from './loading'
import detailsReducer from './details'
import trailerReducer from './trailer'
import usersReducers from './users'

export default combineReducers({
  movies: moviesReducers,
  users: usersReducers,
  imdb: imdbReducers,
  details: detailsReducer,
  trailer: trailerReducer,
  loading: loadingReducer
})
