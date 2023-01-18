import connection from '../../db/connection'
import * as movies from '../movies'

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

describe('Movies DB', () => {
  describe('.all', () => {
    it('fetches all the things', async () => {
      expect.assertions(2)
      const result = await movies.all()

      expect(result).toHaveLength(28)
      expect(result[12]).toMatchInlineSnapshot(`
        {
          "id": 13,
          "release_year": 2013,
          "title": "American Hustle",
        }
      `)
    })
  })

  describe('.allWithCategories', () => {
    it('fetches all the movies and their categories', async () => {
      const data = await movies.allWithCategories()
      expect(data).toHaveLength(28)
      // Get Out doesn't have categories
      expect(data[21]).toMatchInlineSnapshot(`
        {
          "categories": [],
          "id": 22,
          "release_year": 2017,
          "title": "Get Out",
        }
      `)
    })
  })

  describe('.byId', () => {
    it('fetches a specific movie', async () => {
      const result = await movies.byId(12)
      expect(result).toMatchInlineSnapshot(`
        {
          "id": 12,
          "release_year": 2013,
          "title": "12 Years a Slave",
        }
      `)
    })
  })

  describe('.byCategory', () => {
    it('fetches all in a specific category', async () => {
      const result = await movies.byCategory(2)
      expect(result).toHaveLength(8)
      expect(result[0]).toMatchInlineSnapshot(`
        {
          "id": 1,
          "release_year": 2010,
          "title": "Inception",
        }
      `)
    })
  })
})
