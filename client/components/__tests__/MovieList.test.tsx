/** @jest-environment jsdom */
import nock from 'nock'
import App from '../App'
import { Provider } from 'react-redux'
import store from '../../store'

import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('<MovieList />', () => {
  it('Shows a list of movies', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/movies')
      .reply(200, [
        { id: 1, title: 'Get Out', release_year: 2017 },
        { id: 2, title: 'Some Movie', release_year: 2021 },
      ])

    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    const title = await screen.findByRole('heading', {
      name: 'Some Movie (2021)',
    })
    expect(title).toBeVisible()
    expect(scope.isDone()).toBeTruthy()
  })

  it('fails to show a list of movies', async () => {
    const scope = nock('http://localhost').get('/api/v1/movies').reply(500)

    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    const errorMessage = await screen.findByText(
      /Failed: Internal Server Error/
    )
    expect(errorMessage).toBeVisible()
    expect(scope.isDone()).toBeTruthy()
  })
})
