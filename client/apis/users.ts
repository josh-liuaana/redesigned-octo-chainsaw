import request from 'superagent'
import type { User, UserData } from '../../models/movies'

const userUrl = '/api/v1/users'

export async function fetchUserIds() {
  const res = await request.get(userUrl)
  const userArray = res.body
  return userArray
}

export async function fetchSingleUser(id: string): Promise<User> { // user object
  const res = await request.get(`${userUrl}/${id}`)
  const user = res.body
  return user
}

export async function removeUser(id: number) {
  await request.delete(`${userUrl}/${id}`)
}

export async function postUser(user: UserData) {
  const res = await request.post(userUrl).send(user)
  const userFromDb = res.body
  return userFromDb
}