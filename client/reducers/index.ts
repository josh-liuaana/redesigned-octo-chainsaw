import { combineReducers } from 'redux'
import movies from './movies'
import categories from './categories'
import search from './search'
import details from './details'

export default combineReducers({
  movies,
  categories,
  search,
  details,
})
