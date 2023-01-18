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
  it('responds with a list of movies', async () => {
    const res = await request(server).get('/api/v1/movies')
    expect(res.body).toHaveLength(28)
  })

  it('filters to a specific category', async () => {
    const res = await request(server).get('/api/v1/movies?category=7')
    expect(res.body).toMatchInlineSnapshot(`
      [
        {
          "id": 13,
          "release_year": 2013,
          "title": "American Hustle",
        },
      ]
    `)
  })
})

describe('/:id', () => {
  it('responds with a specific movie', async () => {
    const res = await request(server).get('/api/v1/movies/12')
    expect(res.body).toMatchInlineSnapshot(`
      {
        "id": 12,
        "release_year": 2013,
        "title": "12 Years a Slave",
      }
    `)
  })
})
