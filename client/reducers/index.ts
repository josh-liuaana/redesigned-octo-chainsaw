import { combineReducers } from 'redux'
import movies from './movies'
import categories from './categories'
import search from './search'

export default combineReducers({
  movies,
  categories,
  search,
})
