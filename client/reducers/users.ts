import type { User, UserAction } from '../../models/movies'
import { SET_USERS, ERROR, DEL_USER, ADD_USER } from '../actions/users'

const initialState = [] as User[]

export default function usersReducers(state = initialState, action: UserAction) {
  const { type, payload } = action
  switch(type) {

    case SET_USERS:
      return payload

    case DEL_USER:
      return state.filter(user => user.id !== payload)

    case ADD_USER:
      return [...state, payload]

    case ERROR:
      return payload

    default:
      return state
  }
}