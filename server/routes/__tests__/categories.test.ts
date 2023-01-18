import request from 'supertest'
import server from '../../server'
import connection from '../../db/connection'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

describe('/', () => {
  it('responds with a list of categories', async () => {
    const res = await request(server).get('/api/v1/categories')
    expect(res.body).toHaveLength(9)
  })
})

describe('/:id', () => {
  it('responds with a specific movie', async () => {
    const res = await request(server).get('/api/v1/categories/3')
    expect(res.body).toMatchInlineSnapshot(`
      {
        "id": 3,
        "name": "Drama",
      }
    `)
  })
})
