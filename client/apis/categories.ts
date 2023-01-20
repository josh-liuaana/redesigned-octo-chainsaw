import { Category } from '../../common/Movie'
import request from 'superagent'

export async function all() {
  const res = await request.get('/api/v1/categories')
  const data = res.body
  return data as Category[]
}
