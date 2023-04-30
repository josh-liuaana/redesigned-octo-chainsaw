import { describe, it, expect } from "vitest";

import moviesReducer from "./movies";
import * as movieActions from '../actions/movies'
import { mockDb } from "../../models/mock-data";
import { Movie } from "../../models/movies";

describe('test environment working', () => {
  it('I think you will find this test suite is quite operational', () => {
    expect(1 + 1).not.toBe(9000)
    expect('JoshyBoii').toBeDefined()
    expect([1, 2, 3, 4]).toHaveLength(4)
    expect('Joshua Liuaana').not.toContain('taters precious')
  })
})

describe('Movie reducer', () => {
  it('initialises original empty state', () => {
    const state = moviesReducer(undefined, { type: '@@INIT'} as any)
    expect(state).toEqual([])
  })

  it('populates state with the original movie data', () => {
    const state = moviesReducer(undefined, movieActions.setMovies(mockDb)) as Movie[]
    
    expect(state[3]).toBeUndefined()
    expect(state).toHaveLength(3)
    expect(state).toEqual(mockDb)
    expect(state[0]).toHaveProperty('title', 'Big Hero 6')
  })

  it('sorts the state by title, in alphabetical order', () => {
    const state = moviesReducer(mockDb, movieActions.alphaSort()) as Movie[]
    const res = state[0].title.localeCompare(state[1].title)
    expect(res).toBeLessThan(0)
    expect(state).toEqual(mockDb)
  })

  it('sorts the state by date added', () => {
    const state = moviesReducer(mockDb, movieActions.dateSort()) as Movie[]
    expect(state[0].date_added).toBeLessThan(state[1].date_added)
    expect(state).toEqual(mockDb)
  })

  it('deletes a movie in the state', () => {
    const state = moviesReducer(mockDb, movieActions.deleteMovie(2)) as Movie[]
    const found = state.find(movie => movie.id === 2)
    expect(state).toHaveLength(2)
    expect(found).toBeUndefined()
    expect(state).not.toEqual(mockDb)
  })

  it('adds a movie to the state', () => {

    const state = moviesReducer(mockDb, movieActions.saveMovie({
      id: 4,
      title: 'Cars',
      imdb_id: 'tt0317219',
      watched: false,
      img: 'https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_Ratio0.6757_AL_.jpg',
      date_added: 1682205263129
    })) as Movie[]

    expect(state).toHaveLength(4)
    //  These two essentially do the same thing
    expect(state[state.length - 1].title).toBe('Cars')
    expect(state[3]).toHaveProperty('title', 'Cars')
    expect(state).not.toEqual(mockDb)
  })

  it('updates the seen status in state', () => {
    const state = moviesReducer(mockDb, movieActions.updateMovie(2, true)) as Movie[]

    expect(state).not.toEqual(mockDb)

    const res = state.find(movie => movie.id === 2)
    expect(res).toHaveProperty('watched', true)
  })

  it('return the error state when failure occurs', () => {
    const state = moviesReducer(undefined, movieActions.error('ERROR'))
    expect(state).toBe('ERROR')
  })
})