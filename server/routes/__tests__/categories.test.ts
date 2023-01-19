/** @jest-environment node */
import request from 'supertest'
import server from '../../server'
import connection from '../../db/connection'
import { byId, all } from '../../db/categories'

jest.mock('../../db/categories')

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
  it('responds with a list of categories', async () => {
    jest.mocked(all).mockResolvedValue([
      { id: 1, name: 'Drama' },
      { id: 2, name: 'Comedy' },
    ])
    const res = await request(server).get('/api/v1/categories')
    expect(res.body).toHaveLength(2)
  })

  it('responds with a 500', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})

    jest.mocked(all).mockRejectedValue(new Error('Database error'))
    const res = await request(server).get('/api/v1/categories')
    expect(res.statusCode).toBe(500)
  })
})

describe('/:id', () => {
  it('responds with a specific movie', async () => {
    jest.mocked(byId).mockResolvedValue({ id: 3, name: 'Drama' })
    const res = await request(server).get('/api/v1/categories/3')
    expect(res.body).toMatchInlineSnapshot(`
      {
        "id": 3,
        "name": "Drama",
      }
    `)
  })

  it('responds with a 404', async () => {
    jest.mocked(byId).mockResolvedValue(undefined)
    const res = await request(server).get('/api/v1/categories/999')
    expect(res.statusCode).toBe(404)
  })

  it('responds with a 500', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})

    jest.mocked(byId).mockRejectedValue(new Error('Database error'))
    const res = await request(server).get('/api/v1/categories/2')
    expect(res.statusCode).toBe(500)
  })
})
