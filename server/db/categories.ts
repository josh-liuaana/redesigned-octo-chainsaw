import connection from './connection'

export function getAll(db = connection) {
  return db('category').select('*')
}

export function byId(id: number, db = connection) {
  return db('category').select().where({ id }).first()
}

export function byName(name: string, db = connection) {
  return db('category').select().where({ name }).first()
}
