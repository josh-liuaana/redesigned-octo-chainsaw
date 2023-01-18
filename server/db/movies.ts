import { MovieWithCategories } from '../../common/Movie'
import connection from './connection'

export const all = (db = connection) => db('movie').select('*')

export const allWithCategories = async (db = connection) => {
  const data = await db('movie')
    .leftOuterJoin('movie_category', 'movie.id', 'movie_category.movie_id')
    .join('category', 'category.id', 'movie_category.category_id')

  const result = [] as MovieWithCategories[]

  let last: MovieWithCategories | undefined
  for (const item of data) {
    if (last == null || item.movie_id != last.id) {
      last = {
        id: item.movie_id,
        title: item.title,
        release_year: item.release_year,
        categories: [],
      }
      result.push(last)
    }

    last.categories.push({ id: item.category_id, name: item.name })
  }

  return result
}

export const byId = (id: number, db = connection) =>
  db('movie').select().where({ id }).first()

export const byCategory = (category_id: number, db = connection) =>
  db('movie')
    .select('id', 'title', 'release_year')
    .join('movie_category', 'movie.id', 'movie_category.movie_id')
    .where({ category_id })
