import * as api from '../movies'
import nock from 'nock'

import { describe, it, expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

import matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

afterEach(cleanup)

/**
 * Normally I wouldn't write these tests or tests like this at all,
 * we can get the same coverage from integration tests and there's
 * not much logic in these api methods...
 *
 * ... but this is how I would write them if I did
 */
describe('all', () => {
  it('gets all the movies', async () => {
    const mockData = [
      { id: 1, title: 'The Great Escape', release_year: 1964 },
      { id: 2, title: 'Return to Oz', release_year: 1971 },
      { id: 3, title: 'Around the World in 80 Days', release_year: 1973 },
    ]

    const scope = nock('http://localhost')
      .get('/api/v1/movies')
      .reply(200, mockData)

    const result = await api.all()
    expect(result).toStrictEqual(mockData)
    expect(scope.isDone()).toBeTruthy()
  })

  it('fails if the server fails (a)', async () => {
    const scope = nock('http://localhost').get('/api/v1/movies').reply(500)

    await expect(api.all()).rejects.toEqual(new Error('Internal Server Error'))
    expect(scope.isDone()).toBeTruthy()
  })

  it('fails if the server fails (b)', async () => {
    const scope = nock('http://localhost').get('/api/v1/movies').reply(500)
    let error: unknown

    try {
      await api.all()
    } catch (e) {
      error = e
    }

    expect(error).not.toBeNull()
    expect(scope.isDone()).toBeTruthy()
  })
})
