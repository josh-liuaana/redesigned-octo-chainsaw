import type { User, UserAction } from '../../models/movies'
import { SET_USER_IDS, ERROR } from '../actions/users'

const initialState = {} as User

export default function usersReducers(state = initialState, action: UserAction) {
  const { type, payload } = action
  switch(type) {

    case SET_USER_IDS:
      return payload

    case ERROR:
      return payload

    default:
      return state
  }
}