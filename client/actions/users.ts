import { User, UserAction, UserData} from '../../models/movies'
import { fetchSingleUser, fetchUserIds, postUser, removeUser } from '../apis/users'
import { ThunkAction } from '../store'

export const ERROR = 'ERROR'
export const SET_USER_IDS = 'SET_USER_IDS'
export const SET_ACTIVE_USER = 'SET_ACTIVE_USER' 
export const DEL_USER = 'DEL_USER'
export const ADD_USER = 'ADD_USER'

export function error(message: string): UserAction {
  return {
    type: ERROR,
    payload: message
  }
}

export function setUserIds(userIds: Partial<User>[]): UserAction {
  return {
    type: SET_USER_IDS,
    payload: userIds
  }
}

export function setActiveUser(user: User): UserAction {
  return {
    type: SET_ACTIVE_USER,
    payload: user
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

export function getUserIds(): ThunkAction {
  return async (dispatch) => {
    try {
      const userIds = await fetchUserIds()
      dispatch(setUserIds(userIds))
    } catch (err) {
      console.error('Action booboo:', err)
      dispatch(error(String(err)))
    }
  }
}

export function getSingleUser(auth0_id: string): ThunkAction {
  return async (dispatch) => {
    try {
      const user = await fetchSingleUser(auth0_id)
      dispatch(setActiveUser(user))
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