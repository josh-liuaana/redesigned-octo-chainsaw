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
      const result = await movies.getAll()

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

  describe('.byCategoriesAll', () => {
    it('fetches movies that match all categories', async () => {
      const result = await movies.byCategoriesAll([3, 8])
      expect(result).toMatchInlineSnapshot(`
        [
          {
            "id": 16,
            "release_year": 2014,
            "title": "Whiplash",
          },
        ]
      `)
    })
  })

  describe('.byCategoriesAny', () => {
    it('fetches movies that match any of the categories', async () => {
      const result = await movies.byCategoriesAny([3, 8])
      expect(result).toHaveLength(13)
    })
  })

  describe('deleting a movie', () => {
    it('removes the movie from the database', async () => {
      await movies.delete$(3)
      const rows = await movies.getAll()
      expect(rows).toHaveLength(27)
    })
  })

  describe('creating a movie', () => {
    it('adds a new movie to the database', async () => {
      const id = await movies.create({
        title: 'Ghostbusters',
        release_year: 1984,
      })
      expect(id).toBe(29)
      const rows = await movies.getAll()

      expect(rows).toHaveLength(29)
      expect(rows[28]).toMatchInlineSnapshot(`
        {
          "id": 29,
          "release_year": 1984,
          "title": "Ghostbusters",
        }
      `)
    })
  })

  describe('Adding a category to ta movie', () => {
    it('adds a new relationship', async () => {
      await movies.addCategoryToMovie(10, 8)
      const results = await movies.byCategory(8)
      expect(results).toMatchInlineSnapshot(`
        [
          {
            "id": 16,
            "release_year": 2014,
            "title": "Whiplash",
          },
          {
            "id": 10,
            "release_year": 2012,
            "title": "Django Unchained",
          },
        ]
      `)
    })
  })

  describe('Removing a category from a movie', () => {
    it('removes a relationship', async () => {
      await movies.removeCategoryFromMovie(16, 8)
      const results = await movies.byCategory(8)
      expect(results).toEqual([])
    })
  })
})