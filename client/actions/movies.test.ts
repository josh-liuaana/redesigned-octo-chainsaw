import { describe, it, expect, vi } from "vitest";
import nock from 'nock'

import * as movieActions from './movies'
import { mockDb } from "../../models/mock-data";
import { movieFromDb } from "../../models/mock-data";

vi.spyOn(console, 'error').mockImplementation(() => {})

describe('test environment working', () => {
  it('I think you will find this test suite is quite operational', () => {
    expect(0).not.toBeNull()
    expect('wow').not.toBe("Owen Wilson")
  })
})

describe('getMovies', () => {
  it('runs along like a good little thunccyBoi and gets te movies', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/movies')
      .reply(200, mockDb)

      // Whats this .fn() business?
      const dispatch = vi.fn() // defines a mock functions behaviours and return value, no return is specified here
      // What is the reasoning behind this thunk fella
      const thunk = movieActions.getMovies()
      // when awaiting whatever this thunk chaps is up too, why the two parameters. amd why dispatch and vi.fn()
      // mocks out the dispatch function within the thunk?
      await thunk(dispatch, vi.fn())

      expect(dispatch).toHaveBeenCalledWith(movieActions.setMovies(mockDb))
      expect(scope.isDone()).toBeTruthy()
  })

  it('naughty little thunccyBoi makes a booboo', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/movies')
      .reply(500)

      const dispatch = vi.fn()
      const thunk = movieActions.getMovies()
      const expected = String(new Error('Internal Server Error'))
      await thunk(dispatch, vi.fn())

      expect(dispatch).toHaveBeenCalledWith(movieActions.error(expected))
      expect(scope.isDone()).toBeTruthy()
  })
})

describe('deleteMovieThunk', () => {
  it('byebye movie', async () => {
    const scope = nock('http://localhost')
      .delete('/api/v1/movies/1')
      .reply(200)

    const dispatch = vi.fn()
    const thunk = movieActions.deleteMovieThunk(1)
    await thunk(dispatch, vi.fn())

    expect(dispatch).toHaveBeenCalledWith(movieActions.deleteMovie(1))
    expect(scope.isDone()).toBeTruthy()
  })

  it('nay, you shant be deletin', async () => {
    const scope = nock('http://localhost')
      .delete('/api/v1/movies/1')
      .reply(500)

    const dispatch = vi.fn()
    const thunk = movieActions.deleteMovieThunk(1)
    const expected = String(new Error('Internal Server Error'))
    await thunk(dispatch, vi.fn())

    expect(dispatch).toHaveBeenCalledWith(movieActions.error(expected))
    expect(scope.isDone()).toBeTruthy()
  })
})

describe('addMovieThunk', () => {
  it('oh hello there new movie', async () => {
    const movie = {
      title: 'Cars',
      imdb_id: 'tt0317219',
      watched: false,
      img: 'https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_Ratio0.6757_AL_.jpg',
    }
    const scope = nock('http://localhost')
      .post('/api/v1/movies')
      .reply(200, movieFromDb)

    const dispatch = vi.fn()
    const thunk = movieActions.addMovieThunk(movie)
    await thunk(dispatch, vi.fn())

    expect(dispatch).toHaveBeenCalledWith(movieActions.saveMovie(movieFromDb))
    expect(scope.isDone()).toBeTruthy()
  })

  it('oh no precious, we gots a booboo', async () => {
    const movie = {
      title: 'Cars',
      imdb_id: 'tt0317219',
      watched: false,
      img: 'https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_Ratio0.6757_AL_.jpg',
    }
    const scope = nock('http://localhost')
      .post('/api/v1/movies')
      .reply(500)

    const dispatch = vi.fn()
    const thunk = movieActions.addMovieThunk(movie)
    await thunk(dispatch, vi.fn())
    const expected = String(new Error('Internal Server Error'))

    expect(dispatch).toHaveBeenCalledWith(movieActions.error(expected))
    expect(scope.isDone()).toBeTruthy()
  })
})

describe('updateSeenThunk', () => {
  it('youve gone and seen this movie have ya?', async () => {
    const scope = nock('http://localhost')
      .patch('/api/v1/movies/2')
      .reply(200)

    const dispatch = vi.fn()
    const thunk = movieActions.updateSeenThunk(2, true)
    await thunk(dispatch, vi.fn())

    expect(dispatch).toHaveBeenCalledWith(movieActions.updateMovie(2, true))
    expect(scope.isDone()).toBeTruthy()
  })

  it('haha sike, you aint seen it', async () => {
    const scope = nock('http://localhost')
      .patch('/api/v1/movies/2')
      .reply(500)

    const dispatch = vi.fn()
    const thunk = movieActions.updateSeenThunk(2, true)
    await thunk(dispatch, vi.fn())
    const expected = String(new Error('Internal Server Error'))

    expect(dispatch).toHaveBeenCalledWith(movieActions.error(expected))
    expect(scope.isDone()).toBeTruthy()
  })
})