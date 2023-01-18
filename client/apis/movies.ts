import { Movie, MovieWithCategories } from '../../common/Movie'
import request from 'superagent'

export async function all() {
  const res = await request.get('/api/v1/movies')
  const data = res.body
  return data as Movie[]
}

// export async function allWithCategories() {
//   const res = await request.get('/api/v1/movies?withCategories=true')
//   const data = res.body
//   return data as MovieWithCategories[]
// }
