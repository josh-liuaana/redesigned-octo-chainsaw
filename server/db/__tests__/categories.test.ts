import connection from '../../db/connection'
import * as categories from '../categories'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(() => {
  return connection.seed.run()
})

afterAll(async () => {
  await connection.migrate.rollback()
  await connection.destroy()
})

describe('categories', () => {
  describe('.all', () => {
    it('gets all the categories', async () => {
      const data = await categories.getAll()
      expect(data).toHaveLength(9)
      expect(data[0]).toMatchInlineSnapshot(`
        {
          "id": 1,
          "name": "Action/Adventure",
        }
      `)
    })
  })

  describe('byId', () => {
    it('gets a specific category', async () => {
      const data = await categories.byId(3)
      expect(data).toMatchInlineSnapshot(`
        {
          "id": 3,
          "name": "Drama",
        }
      `)
    })

    it('returns undefined when there is no such category', async () => {
      const data = await categories.byId(123123)
      expect(data).toBeUndefined()
    })
  })

  describe('byName', () => {
    it('gets a specific category', async () => {
      const data = await categories.byName('Sci-Fi')
      expect(data).toMatchInlineSnapshot(`
        {
          "id": 2,
          "name": "Sci-Fi",
        }
      `)
    })

    it('returns undefined when there is no such category', async () => {
      const data = await categories.byName('Not a category')
      expect(data).toBeUndefined()
    })
  })
})
