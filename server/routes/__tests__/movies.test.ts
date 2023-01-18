/** @jest-environment node */
import request from 'supertest'

import server from '../../server'
import connection from '../../db/connection'
import { byId, all } from '../../db/movies'

// TODO: maybe use mock return values for all of these?
jest.mock('../../db/movies', () => {
  const original = jest.requireActual('../../db/movies')

  return {
    __esModule: true,
    all: jest.fn(original.all),
    byId: jest.fn(original.byId),
    byCategory: jest.fn(original.byCategory),
    allWithCategories: jest.fn(original.allWithCategories),
  }
})

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.migrate.rollback()
  await connection.destroy()
})

describe('/', () => {
  it('responds with a list of movies', async () => {
    const res = await request(server).get('/api/v1/movies')
    expect(res.body).toHaveLength(28)
  })

  it('responds with a list of movies and their categories', async () => {
    const res = await request(server).get('/api/v1/movies?withCategories=true')
    expect(res.body).toHaveLength(28)
    expect(res.body[0]).toMatchInlineSnapshot(`
      {
        "categories": [
          {
            "id": 1,
            "name": "Action/Adventure",
          },
          {
            "id": 2,
            "name": "Sci-Fi",
          },
        ],
        "id": 1,
        "release_year": 2010,
        "title": "Inception",
      }
    `)
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

  it('responds with a 500', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})

    jest.mocked(all).mockRejectedValue(new Error('Database Error'))
    const res = await request(server).get('/api/v1/movies')
    expect(res.statusCode).toBe(500)
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

  it('responds with a 404', async () => {
    const res = await request(server).get('/api/v1/movies/999')
    expect(res.statusCode).toBe(404)
  })

  it('responds with a 500', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})

    jest.mocked(byId).mockRejectedValue(new Error('Database Error'))
    const res = await request(server).get('/api/v1/movies/999')
    expect(res.statusCode).toBe(500)
  })
})
