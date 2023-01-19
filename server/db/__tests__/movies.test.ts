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
      expect(result).toMatchInlineSnapshot(`
        [
          {
            "id": 2,
            "release_year": 2010,
            "title": "The Social Network",
          },
          {
            "id": 3,
            "release_year": 2010,
            "title": "Black Swan",
          },
          {
            "id": 4,
            "release_year": 2010,
            "title": "The King's Speech",
          },
          {
            "id": 5,
            "release_year": 2011,
            "title": "The Help",
          },
          {
            "id": 9,
            "release_year": 2012,
            "title": "Silver Linings Playbook",
          },
          {
            "id": 10,
            "release_year": 2012,
            "title": "Django Unchained",
          },
          {
            "id": 12,
            "release_year": 2013,
            "title": "12 Years a Slave",
          },
          {
            "id": 14,
            "release_year": 2014,
            "title": "The Grand Budapest Hotel",
          },
          {
            "id": 15,
            "release_year": 2014,
            "title": "Boyhood",
          },
          {
            "id": 16,
            "release_year": 2014,
            "title": "Whiplash",
          },
          {
            "id": 18,
            "release_year": 2015,
            "title": "The Big Short",
          },
          {
            "id": 19,
            "release_year": 2015,
            "title": "The Revenant",
          },
          {
            "id": 20,
            "release_year": 2016,
            "title": "Moonlight",
          },
        ]
      `)
    })
  })
})
