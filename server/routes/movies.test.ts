import { describe, it, expect, beforeEach, vi } from 'vitest'
import request from 'supertest'
import server from '../server'
import * as db from '../db/movies'
import { mockDb } from '../../models/mock-data'

describe('test environment working', () => {
  it('works as expected', () => {
    expect.assertions(4)
    expect(true).toBeTruthy()
    expect(1 + 1).toBe(2)
    expect('hello Josh').toBeTypeOf('string')
    expect([1, 2, 3]).toHaveLength(3)
  })
})

vi.mock('../db/movies')

// This will clear mock history and reset its implementation to an empty function
beforeEach(() => {
  vi.resetAllMocks()
})

const movieUrl = '/api/v1/movies'

const singleMovieResponse = {
  id: 5,
  title: 'Raya and the Last Dragon',
  imdb_id: 'tt5109280',
  watched: false,
  img: 'https://m.media-amazon.com/images/M/MV5BZWNiOTc4NGItNGY4YS00ZGNkLThkOWEtMDE2ODcxODEwNjkwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_Ratio0.6757_AL_.jpg',
  date_added: 1682205263129,
}

// Keeps an eye on the console and stops it from logging when we run our tests
// Initially had it in the error tests (where they are commented out), but seems to work perfectly fine outside of the functions
// If the first test has the spyOn then none of the errors log, if the second has, then the first logs etc
vi.spyOn(console, 'error').mockImplementation(() => {})


describe(`'/' get route`, async () => {
  it('responds with all movies', async () => {
    expect.assertions(4)
    vi.mocked(db.getAllMovies).mockResolvedValue(mockDb)
    const res = await request(server).get(movieUrl)
    expect(res.body).toHaveLength(3)
    expect(db.getAllMovies).toHaveBeenCalledOnce()
    expect(res.body[1].title).toEqual('Luca')
    expect(res.body[2].watched).toBeTypeOf('boolean')
  })

  it('responds with a 500 error if fails', async () => {
    // vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.mocked(db.getAllMovies).mockRejectedValue(new Error('Route error'))
    const res = await request(server).get(movieUrl)
    
    expect(res.statusCode).toBe(500)
    
  })
})

describe(`'/:id' delete route`, () => {
  it('deletes a movie from the database', async () => {
    vi.mocked(db.delMovie).mockResolvedValue(0)
    const res = await request(server).delete(movieUrl + '/2')
    // perhaps run the get route and check to see if isnt there anymore
    // similar to db test
    expect(db.delMovie).toHaveBeenCalledOnce()
    expect(res.statusCode).toBe(200)
  })

  it('responds with a 500 error if fails', async () => {
    // vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.mocked(db.delMovie).mockRejectedValue(new Error('Route error'))
    const res = await request(server).delete(movieUrl + '/2')

    expect(res.statusCode).toBe(500)
  })
})


describe(`'/' post route`, () => {
  it('adds a movie to the database', async () => {
    vi.mocked(db.insertMovie).mockResolvedValue([singleMovieResponse])
      const res = await request(server).post(movieUrl).send({
        title: 'Raya and the Last Dragon',
        imdb_id: 'tt5109280',
        watched: false,
        img: 'https://m.media-amazon.com/images/M/MV5BZWNiOTc4NGItNGY4YS00ZGNkLThkOWEtMDE2ODcxODEwNjkwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_Ratio0.6757_AL_.jpg',
      })
      expect(res.body).toStrictEqual(singleMovieResponse)
      expect(res.statusCode).toBe(200)
      expect(db.insertMovie).toHaveBeenCalledOnce()
  })

  it('responds with a 500 if fails', async () => {
    // vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.mocked(db.insertMovie).mockRejectedValue(new Error('Route error'))
    const res = await request(server).post(movieUrl).send({
      title: 'Raya and the Last Dragon',
      imdb_id: 'tt5109280',
      watched: false,
      img: 'https://m.media-amazon.com/images/M/MV5BZWNiOTc4NGItNGY4YS00ZGNkLThkOWEtMDE2ODcxODEwNjkwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_Ratio0.6757_AL_.jpg',
    })

    expect(res.statusCode).toBe(500)
  })
})

describe(`'/:id' update route`, () => {
  it('updates the seen status of a movie in the database', async () => {
    vi.mocked(db.updateMovie).mockResolvedValue()
    const res = await request(server).patch(movieUrl + '/1')
    // perhaps run the get route and check to see if it has been updated
    // similar to db test
    expect(db.updateMovie).toHaveBeenCalledOnce()
    expect(res.statusCode).toBe(200)
  })

  it('responds with a 500 if fails', async () => {
    vi.mocked(db.updateMovie).mockRejectedValue(new Error('Route error'))
    const res = await request(server).patch(movieUrl + '/1')

    expect(res.statusCode).toBe(500)
  })
})