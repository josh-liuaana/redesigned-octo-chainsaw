import { combineReducers } from 'redux'
import moviesReducers from './movies'

export default combineReducers({
  movies: moviesReducers
})
