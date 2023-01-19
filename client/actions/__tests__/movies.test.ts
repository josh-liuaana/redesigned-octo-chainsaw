import * as actions from '../movies'
import nock from 'nock'

describe('pending action creator', () => {
  it('creates an action object', () => {
    expect(actions.pending()).toMatchInlineSnapshot(`
      {
        "type": "movies/pending",
      }
    `)
  })
})

describe('fetchMovies', () => {
  it('dispatches receive if the server responds with data', async () => {
    const mockData = [
      { id: 1, title: 'The Great Escape', release_year: 1964 },
      { id: 2, title: 'Return to Oz', release_year: 1971 },
      { id: 3, title: 'Around the World in 80 Days', release_year: 1973 },
    ]
    const scope = nock('http://localhost')
      .get('/api/v1/movies')
      .reply(200, mockData)

    const dispatch = jest.fn()
    const thunk = actions.fetchMovies()
    await thunk(dispatch, jest.fn())
    expect(dispatch).toHaveBeenCalledWith(actions.pending())
    expect(dispatch).toHaveBeenCalledWith(actions.receive(mockData))
    expect(scope.isDone()).toBeTruthy()
  })

  it('dispatchs failed if the server responds with an error', async () => {
    const scope = nock('http://localhost').get('/api/v1/movies').reply(500)

    const dispatch = jest.fn()
    const thunk = actions.fetchMovies()

    await thunk(dispatch, jest.fn())
    expect(dispatch).toHaveBeenCalledWith(actions.pending())
    expect(dispatch).toHaveBeenCalledWith(
      actions.failed('Internal Server Error')
    )
    expect(scope.isDone()).toBeTruthy()
  })
})
