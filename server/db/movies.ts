import connection from './connection'

export const all = (db = connection) => db('movie').select('*')

export const allWithCategories = (db = connection) =>
  db('movie')
    .leftOuterJoin('movie_category', 'movie.id', 'movie_category.movie_id')
    .join('category', 'category.id', 'movie_category.category_id')

export const byId = (id: number, db = connection) =>
  db('movie').select().where({ id }).first()

export const byCategory = (category_id: number, db = connection) =>
  db('movie')
    .select('id', 'title', 'release_year')
    .join('movie_category', 'movie.id', 'movie_category.movie_id')
    .where({ category_id })
