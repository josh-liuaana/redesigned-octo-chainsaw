import { Movie } from '../../common/Movie'
import request from 'superagent'

export async function all() {
  const res = await request.get('/api/v1/movies')
  const data = res.body
  return data as Movie[]
}

export async function byId(id: string) {
  const res = await request.get(`/api/v1/movies/${id}`)
  const data = res.body
  return data as Movie
}

export async function create(movie: Movie) {
  const res = await request.post('/api/v1/movies').send(movie)
  const data = res.body
  return data as Movie
}

export async function remove(id: number) {
  await request.delete(`/api/v1/movies/${id}`)
}

export async function addCategoryToMovie(movieId: number, categoryId: number) {
  await request
    .post(`/api/v1/movies/${movieId}/categories`)
    .send({ category_id: categoryId })
}

export async function removeCategoryFromMovie(
  movieId: number,
  categoryId: number
) {
  await request.delete(`/api/v1/movies/${movieId}/categories/${categoryId}`)
}
