import nock from 'nock'
import { describe, it, expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import * as imdbApi from './imdb'

expect.extend(matchers)
afterEach(cleanup)

describe('test environment working', () => {
  it('works as expected', () => {
    expect.assertions(4)
    expect(false).not.toBeTruthy()
    expect(NaN).toBeNaN()
    expect('hello josh, how are you').toContain('josh')
    expect(undefined).not.toBeDefined()
  })
})

// a random request will just return an array with no results
describe.todo('searchImdb', () => {
  it.todo('searches imdb and returns an array of movies')
})

// For both info and trailer;
  // an id with no real id returns the same object but with null
  // for each value
  // "errorMessage" will have a value of invalid request
describe.todo('movieInfo', () => {
  it.todo('searches imdb and returns details of a single movie')
})

describe.todo('getTrailer', () => {
  it.todo('searches imdb and returns an object of trailer data')
})