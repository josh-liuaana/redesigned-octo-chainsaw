import connection from './connection'

export const all = (db = connection) => db('category').select('*')

export const allWithCategories = (db = connection) => db('category')

export const byId = (id: number, db = connection) =>
  db('category').select().where({ id }).first()

export const byName = (name: string, db = connection) =>
  db('category').select().where({ name }).first()
