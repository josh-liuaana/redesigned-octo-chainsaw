import reducer from '../movies'
import * as actions from '../../actions/movies'

const mockData = [
  { id: 1, title: 'The Great Escape', release_year: 1964 },
  { id: 2, title: 'Return to Oz', release_year: 1971 },
  { id: 3, title: 'Around the World in 80 Days', release_year: 1973 },
]

describe('Movies reducer', () => {
  it('initialises to empty state', () => {
    const state = reducer(undefined, { type: '@@INIT' } as any)
    expect(state).toMatchInlineSnapshot(`
      {
        "data": [],
        "error": undefined,
        "pending": true,
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
        "pending": false,
      }
    `)
  })

  it('sets pending state', () => {
    const state = reducer(
      { data: [], error: undefined, pending: false },
      actions.pending()
    )
    expect(state).toMatchInlineSnapshot(`
      {
        "data": [],
        "error": undefined,
        "pending": true,
      }
    `)
  })
})
