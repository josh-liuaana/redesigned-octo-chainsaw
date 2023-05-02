import request from 'superagent'
import type { UserData } from '../../models/movies'

const userUrl = '/api/v1/users'

export async function fetchUsers() {
  const res = await request.get(userUrl)
  const userArray = res.body
  return userArray
}

export async function removeUser(id: number) {
  await request.delete(`${userUrl}/${id}`)
}

export async function postUser(user: UserData) {
  const res = await request.post(userUrl).send(user)
  const userFromDb = res.body
  return userFromDb
}