import { User, UserAction, UserData} from '../../models/movies'
import { fetchUsers, postUser, removeUser } from '../apis/users'
import { ThunkAction } from '../store'

export const ERROR = 'ERROR'
export const SET_USERS = 'SET_USERS' 
export const DEL_USER = 'DEL_USER'
export const ADD_USER = 'ADD_USER'

export function error(message: string): UserAction {
  return {
    type: ERROR,
    payload: message
  }
}

export function setUsers(users: User[]): UserAction {
  return {
    type: SET_USERS,
    payload: users
  }
}

export function deleteUser(id: number): UserAction {
  return {
    type: DEL_USER,
    payload: id
  }
}

export function saveUser(user: User): UserAction {
  return {
    type: ADD_USER,
    payload: user
  }
}


export function getUsers(): ThunkAction {
  return async (dispatch) => {
    try {
      const usersArray = await fetchUsers()
      dispatch(setUsers(usersArray))
    } catch (err) {
      console.error('Action booboo:', err)
      dispatch(error(String(err)))
    }
  }
}

export function deleteUserThunk(id: number): ThunkAction {
  return async (dispatch) => {
    try {
      await removeUser(id)
      dispatch(deleteUser(id))
    } catch (err) {
      console.error('Action booboo:', err)
      dispatch(error(String(err)))
    }
  }
}

export function addUserThunk(user: UserData): ThunkAction {
  return async (dispatch) => {
    try {
      const userFromDb = await postUser(user)
      dispatch(saveUser(userFromDb))
    } catch (err) {
      console.error('Action booboo:', err)
      dispatch(error(String(err)))
    }
  }
}