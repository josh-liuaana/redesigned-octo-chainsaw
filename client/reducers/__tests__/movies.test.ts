import { describe, it, expect } from 'vitest'

import reducer from '../movies'
import * as actions from '../../actions/movies'

const mockData = [
  { id: 1, title: 'The Great Escape', release_year: 1964 },
  { id: 2, title: 'Return to Oz', release_year: 1971 },
  { id: 3, title: 'Around the World in 80 Days', release_year: 1973 },
]

describe('Movies reducer', () => {
  it('initialises to empty state', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const state = reducer(undefined, { type: '@@INIT' } as any)
    expect(state).toMatchInlineSnapshot(`
      {
        "data": [],
        "error": undefined,
        "loading": true,
      }
    `)
  })

  it('receives data', () => {
    const state = reducer(undefined, actions.receive(mockData))
    expect(state).toHaveProperty('data', mockData)
  })

  it('sets an error state', () => {
    const state = reducer(undefined, actions.failed('Oops!'))
    expect(state).toMatchInlineSnapshot(`
      {
        "data": [],
        "error": "Oops!",
        "loading": false,
      }
    `)
  })

  it('sets loading state', () => {
    const state = reducer(
      { data: [], error: undefined, loading: false },
      actions.loading()
    )
    expect(state).toMatchInlineSnapshot(`
      {
        "data": [],
        "error": undefined,
        "loading": true,
      }
    `)
  })

  it('creates a movie in redux state', () => {
    const state = reducer(
      { data: [], error: undefined, loading: false },
      actions.created({
        id: 5,
        title: 'Puss in Boots: The Last Wish',
        release_year: 2022,
      })
    )

    expect(state).toMatchInlineSnapshot(`
      {
        "data": [
          {
            "id": 5,
            "release_year": 2022,
            "title": "Puss in Boots: The Last Wish",
          },
        ],
        "error": undefined,
        "loading": false,
      }
    `)
  })

  it('deletes a movie from redux state', () => {
    const state = reducer(
      {
        data: [
          { id: 1, title: 'Ghostbusters', release_year: 1984 },
          { id: 2, title: 'The Princess Bride', release_year: 1987 },
        ],
        error: undefined,
        loading: false,
      },
      actions.deleted(2)
    )

    expect(state).toMatchInlineSnapshot(`
      {
        "data": [
          {
            "id": 1,
            "release_year": 1984,
            "title": "Ghostbusters",
          },
        ],
        "error": undefined,
        "loading": false,
      }
    `)
  })
})
