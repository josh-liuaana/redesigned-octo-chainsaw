/** @jest-environment node */
import request from 'supertest'

import server from '../../server'
import connection from '../../db/connection'
import { byId, all, allWithCategories, byCategory } from '../../db/movies'

jest.mock('../../db/movies')

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
    jest.mocked(all).mockResolvedValue([
      { id: 1, title: 'The Great Escape', release_year: 1964 },
      { id: 2, title: 'Return to Oz', release_year: 1971 },
      { id: 3, title: 'Around the World in 80 Days', release_year: 1973 },
    ])
    const res = await request(server).get('/api/v1/movies')
    expect(res.body).toHaveLength(3)
    expect(res.body[0]).toMatchInlineSnapshot(`
      {
        "id": 1,
        "release_year": 1964,
        "title": "The Great Escape",
      }
    `)
  })

  it('responds with a list of movies and their categories', async () => {
    jest.mocked(allWithCategories).mockResolvedValue([
      {
        id: 1,
        title: 'The Great Escape',
        release_year: 1964,
        categories: [
          { id: 1, name: 'Action/Adventure' },
          { id: 2, name: 'History' },
        ],
      },
    ])
    const res = await request(server).get('/api/v1/movies?withCategories=true')
    expect(res.body).toHaveLength(1)
    expect(res.body[0]).toMatchInlineSnapshot(`
      {
        "categories": [
          {
            "id": 1,
            "name": "Action/Adventure",
          },
          {
            "id": 2,
            "name": "History",
          },
        ],
        "id": 1,
        "release_year": 1964,
        "title": "The Great Escape",
      }
    `)
  })

  it('filters to a specific category', async () => {
    jest
      .mocked(byCategory)
      .mockResolvedValue([
        { id: 3, title: 'Special Movie', release_year: 1923 },
      ])
    const res = await request(server).get('/api/v1/movies?category=7')
    expect(res.body).toMatchInlineSnapshot(`
      [
        {
          "id": 3,
          "release_year": 1923,
          "title": "Special Movie",
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
    jest.mocked(byId).mockResolvedValue({
      id: 12,
      title: '12 Years a Slave',
      release_year: 2013,
    })
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
    jest.mocked(byId).mockResolvedValue(undefined)

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
