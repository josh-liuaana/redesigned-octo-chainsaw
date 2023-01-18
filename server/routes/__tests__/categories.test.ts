/** @jest-environment node */
import request from 'supertest'
import server from '../../server'
import connection from '../../db/connection'
import { byId, all } from '../../db/categories'

// TODO: maybe use mock return values for all of these?
jest.mock('../../db/categories', () => {
  const original = jest.requireActual('../../db/categories')

  return {
    __esModule: true,
    all: jest.fn(original.all),
    byId: jest.fn(original.byId),
  }
})

const mockAll = jest.mocked(all)
const mockById = jest.mocked(byId)

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
    const res = await request(server).get('/api/v1/categories')
    expect(res.body).toHaveLength(9)
  })

  it('responds with a 500', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})

    mockAll.mockRejectedValue(new Error('Database error'))
    const res = await request(server).get('/api/v1/categories')
    expect(res.statusCode).toBe(500)
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

  it('responds with a 404', async () => {
    const res = await request(server).get('/api/v1/categories/999')
    expect(res.statusCode).toBe(404)
  })

  it('responds with a 500', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})

    mockById.mockRejectedValue(new Error('Database error'))
    const res = await request(server).get('/api/v1/categories/2')
    expect(res.statusCode).toBe(500)
  })
})
