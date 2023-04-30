import * as moviesApi from './movies'
import nock from 'nock'
import { describe, it, expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'

import { mockDb, movieFromDb } from '../../models/mock-data'

expect.extend(matchers)

afterEach(cleanup)

describe('test environment working', () => {
  it('works as expected', () => {
    expect.assertions(4)
    expect(false).toBeFalsy()
    expect(7).not.toBeNaN()
    expect(0.2 + 0.1).toBeCloseTo(0.3, 10)
    expect([1, 2, 3]).toBeDefined()
  })
})

describe('fetchMovies', () => {
  it('gets all the movies from the database', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/movies')
      .reply(200, mockDb)

    const res = await moviesApi.fetchMovies()
    expect(res).toStrictEqual(mockDb)
    expect(res).toHaveLength(3)
    expect(scope.isDone()).toBeTruthy()
  })

  it('responds with a 500 error if fails', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/movies')
      .reply(500)

    const res = moviesApi.fetchMovies()
    const expected = new Error('Internal Server Error')
    await expect(res).rejects.toEqual(expected)
    expect(scope.isDone()).toBeTruthy()
  })
})

describe('removeMovies', () => {
  it('removes a movie from the database', async () => {
    const scope = nock('http://localhost')
      .delete('/api/v1/movies/1')
      .reply(200)

    await moviesApi.removeMovie(1)
    expect(scope.isDone()).toBeTruthy()
  })

  it('responds with a 500 error if fails', async () => {
    const scope = nock('http://localhost')
      .delete('/api/v1/movies/1')
      .reply(500)

    const res = moviesApi.removeMovie(1)
    const expected = new Error('Internal Server Error')
    await expect(res).rejects.toEqual(expected)
    expect(scope.isDone()).toBeTruthy()
  })

  it('responds with a 404 if movie doesnt exist', async () => {
    const scope = nock('http://localhost')
    .delete('/api/v1/movies/10')
    .reply(404)

    const res = moviesApi.removeMovie(10)
    const expected = new Error('Not Found')
    await expect(res).rejects.toEqual(expected)
    expect(scope.isDone()).toBeTruthy()
  })
})

describe('postMovie', () => {
  it('adds a movie to the database', async () => { 
    const scope = nock('http://localhost')
      .post('/api/v1/movies')
      .reply(200, movieFromDb)
    
    const res = await moviesApi.postMovie({
        title: 'Cars',
        imdb_id: 'tt0317219',
        watched: false,
        img: 'https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_Ratio0.6757_AL_.jpg',
      })
    expect(res).toStrictEqual(movieFromDb)
    expect(scope.isDone()).toBeTruthy()
  })

  it('responds with a 500 error if fails', async () => {
    const scope = nock('http://localhost')
    .post('/api/v1/movies')
    .reply(500)

    const res = moviesApi.postMovie({
      title: 'Cars',
      imdb_id: 'tt0317219',
      watched: false,
      img: 'https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_Ratio0.6757_AL_.jpg',
    })
    const expected = new Error('Internal Server Error')
    await expect(res).rejects.toEqual(expected)
    expect(scope.isDone()).toBeTruthy()
  })

  it.todo('responds with a 403 (Forbidden) error if duplicate movie trying to be added')
})

describe('patchMovie', () => {
  it('updates a movie in the database', async () => {
    const scope = nock('http://localhost')
      .patch('/api/v1/movies/1')
      .reply(200)

    await moviesApi.patchMovie(1, true)
    expect(scope.isDone()).toBeTruthy()
  })

  it('responds with a 500 error if fails', async () => {
    const scope = nock('http://localhost')
      .patch('/api/v1/movies/1')
      .reply(500)

    const res = moviesApi.patchMovie(1, true)
    const expected = new Error('Internal Server Error')
    await expect(res).rejects.toStrictEqual(expected)
    expect(scope.isDone()).toBeTruthy()
  })

  it('responds with a 404 if movie doesnt exist', async () => {
    const scope = nock('http://localhost')
      .patch('/api/v1/movies/10')
      .reply(404)

    const res = moviesApi.patchMovie(10, true)
    const expected = new Error('Not Found')
    await expect(res).rejects.toStrictEqual(expected)
    expect(scope.isDone()).toBeTruthy()
  })
})
