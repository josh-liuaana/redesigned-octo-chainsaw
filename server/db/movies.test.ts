import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import connection from './connection'
import * as movies from './movies'

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

describe('test environment working', () => {
  it('works as expected', () => {
    expect.assertions(4)
    expect(true).toBeTruthy()
    expect(1 + 1).toBe(2)
    expect('hello Josh').toBeTypeOf('string')
    expect([1, 2, 3]).toHaveLength(3)
  })
})

describe('Movies DB', () => {

  it('Retrieves all movies', async () => {
    expect.assertions(2)
    const result = await movies.getAllMovies()

    expect(result).toHaveLength(5)
    expect(result[3]).toStrictEqual({
        id: 4,
        title: 'Onward',
        imdb_id: 'tt7146812',
        watched: 0,
        img: 'https://m.media-amazon.com/images/M/MV5BMTZlYzk3NzQtMmViYS00YWZmLTk5ZTEtNWE0NGVjM2MzYWU1XkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_Ratio0.6757_AL_.jpg',
        date_added: 1682205263121
    })
  })

  it('deletes movie', async () => {
    expect.assertions(2)
    await movies.delMovie(3)
    const result = await movies.getAllMovies()
    const found = result.find((movie => movie.id === 3))
    
    expect(result).toHaveLength(4)
    expect(found).toBeUndefined()
  })

  it('adds a movie', async () => {


    expect.assertions(3)
    const result = await movies.insertMovie({
      title: 'Cars',
      imdb_id: 'tt0317219',
      watched: false,
      img: 'https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_Ratio0.6757_AL_.jpg'
    })
    const expectedResult = {
      id: 6,
      title: 'Cars',
      imdb_id: 'tt0317219',
      watched: 0,
      img: 'https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_Ratio0.6757_AL_.jpg',
      date_added: result[0].date_added
    }
    const movieList = await movies.getAllMovies()
    const found = result.find((movie => movie.id === 6))

    expect(result[0]).toStrictEqual(expectedResult)
    expect(movieList).toHaveLength(6)
    expect(found).toStrictEqual(expectedResult)
  })

  it('updates a movie', async () => {
    expect.assertions(2)
    await movies.updateMovie(2, true)
    const result = await movies.getAllMovies()
    const found = result.find((movie => movie.id === 2))
    
    expect(result[1].watched).toBe(1)
    expect(found?.watched).toBe(1)
  })

})